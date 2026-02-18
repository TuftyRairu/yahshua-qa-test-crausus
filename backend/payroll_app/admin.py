from django.contrib import admin
from .models import Employee, PayrollCalculation


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'email', 'position', 'department', 'employment_type', 'monthly_salary', 'is_active']
    list_filter = ['employment_type', 'department', 'is_active']
    search_fields = ['first_name', 'last_name', 'email']


@admin.register(PayrollCalculation)
class PayrollCalculationAdmin(admin.ModelAdmin):
    list_display = ['employee', 'period_month', 'period_year', 'basic_salary', 'net_pay']
    list_filter = ['period_year', 'period_month']
    search_fields = ['employee__first_name', 'employee__last_name']
