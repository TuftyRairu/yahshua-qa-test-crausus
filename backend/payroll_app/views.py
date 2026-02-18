from decimal import Decimal
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Employee, PayrollCalculation
from .serializers import (
    EmployeeSerializer,
    PayrollCalculationSerializer,
    PayrollCalculateRequestSerializer,
)
from .calculations.tax_calculator import calculate_monthly_withholding_tax, get_tax_brackets
from .calculations.sss_calculator import calculate_sss
from .calculations.philhealth_calculator import calculate_philhealth, calculate_pagibig


@api_view(['GET'])
def health_check(request):
    return Response({"status": "ok", "message": "Payroll API is running."})


# ---------------------------------------------------------------------------
# Employee endpoints
# ---------------------------------------------------------------------------

@api_view(['GET', 'POST'])
def employee_list(request):
    if request.method == 'GET':
        employees = Employee.objects.filter(is_active=True)
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def employee_detail(request, pk):
    try:
        employee = Employee.objects.get(pk=pk)
    except Employee.DoesNotExist:
        return Response({"error": "Employee not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = EmployeeSerializer(employee, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        employee.is_active = False
        employee.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


# ---------------------------------------------------------------------------
# Payroll calculation
# ---------------------------------------------------------------------------

@api_view(['POST'])
def calculate_payroll(request):
    """
    Calculate payroll for an employee.

    BUG #3: When the employee is not found (DoesNotExist), this view catches
    the exception but returns HTTP 200 with an error dict instead of HTTP 404.
    A REST API should return 404 for a missing resource.
    """
    req_serializer = PayrollCalculateRequestSerializer(data=request.data)
    if not req_serializer.is_valid():
        return Response(req_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    data = req_serializer.validated_data
    employee_id = data['employee_id']
    period_month = data['period_month']
    period_year = data['period_year']

    try:
        employee = Employee.objects.get(pk=employee_id, is_active=True)
    except Employee.DoesNotExist:
        # BUG #3: Should return status.HTTP_404_NOT_FOUND (404), not 200.
        return Response(
            {"error": f"Employee with id={employee_id} does not exist."},
            status=status.HTTP_200_OK  # <-- intentional bug: wrong status code
        )

    basic_salary = data.get('override_salary') or employee.monthly_salary

    # Perform calculations
    sss = calculate_sss(basic_salary)
    philhealth = calculate_philhealth(basic_salary)
    pagibig = calculate_pagibig(basic_salary)
    income_tax = calculate_monthly_withholding_tax(basic_salary)

    total_deductions = (
        sss['employee']
        + philhealth['employee']
        + pagibig['employee']
        + income_tax
    )
    net_pay = Decimal(str(basic_salary)) - total_deductions

    # Upsert payroll record
    payroll, created = PayrollCalculation.objects.update_or_create(
        employee=employee,
        period_month=period_month,
        period_year=period_year,
        defaults={
            'basic_salary': basic_salary,
            'sss_employee': sss['employee'],
            'sss_employer': sss['employer'],
            'philhealth_employee': philhealth['employee'],
            'philhealth_employer': philhealth['employer'],
            'pagibig_employee': pagibig['employee'],
            'pagibig_employer': pagibig['employer'],
            'income_tax': income_tax,
            'total_deductions': total_deductions,
            'net_pay': net_pay,
        }
    )

    serializer = PayrollCalculationSerializer(payroll)
    status_code = status.HTTP_201_CREATED if created else status.HTTP_200_OK
    return Response(serializer.data, status=status_code)


# ---------------------------------------------------------------------------
# Payroll history
# ---------------------------------------------------------------------------

@api_view(['GET'])
def payroll_history(request):
    records = PayrollCalculation.objects.select_related('employee').all()

    employee_id = request.query_params.get('employee_id')
    if employee_id:
        records = records.filter(employee_id=employee_id)

    year = request.query_params.get('year')
    if year:
        records = records.filter(period_year=year)

    serializer = PayrollCalculationSerializer(records, many=True)
    return Response(serializer.data)


@api_view(['GET', 'DELETE'])
def payroll_history_detail(request, pk):
    try:
        record = PayrollCalculation.objects.select_related('employee').get(pk=pk)
    except PayrollCalculation.DoesNotExist:
        return Response({"error": "Payroll record not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PayrollCalculationSerializer(record)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        record.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# ---------------------------------------------------------------------------
# Tax brackets
# ---------------------------------------------------------------------------

@api_view(['GET'])
def tax_brackets(request):
    brackets = get_tax_brackets()
    return Response({"brackets": brackets})
