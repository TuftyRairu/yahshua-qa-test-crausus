from rest_framework import serializers
from .models import Employee, PayrollCalculation


class EmployeeSerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField()

    class Meta:
        model = Employee
        fields = [
            'id', 'first_name', 'last_name', 'full_name',
            'email', 'position', 'department', 'employment_type',
            'monthly_salary', 'date_hired', 'is_active',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class PayrollCalculationSerializer(serializers.ModelSerializer):
    employee_name = serializers.SerializerMethodField()
    employee_id = serializers.IntegerField(source='employee.id', read_only=True)

    class Meta:
        model = PayrollCalculation
        fields = [
            'id', 'employee_id', 'employee_name',
            'period_month', 'period_year',
            'basic_salary',
            'sss_employee', 'sss_employer',
            'philhealth_employee', 'philhealth_employer',
            'pagibig_employee', 'pagibig_employer',
            'income_tax',
            'total_deductions', 'net_pay',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']

    def get_employee_name(self, obj):
        return obj.employee.full_name


class PayrollCalculateRequestSerializer(serializers.Serializer):
    employee_id = serializers.IntegerField()
    period_month = serializers.IntegerField(min_value=1, max_value=12)
    period_year = serializers.IntegerField(min_value=2000, max_value=2100)
    override_salary = serializers.DecimalField(
        max_digits=12, decimal_places=2, required=False, allow_null=True
    )
