from django.urls import path
from . import views

urlpatterns = [
    path('health/', views.health_check, name='health-check'),
    path('employees/', views.employee_list, name='employee-list'),
    path('employees/<int:pk>/', views.employee_detail, name='employee-detail'),
    path('calculate-payroll/', views.calculate_payroll, name='calculate-payroll'),
    path('payroll-history/', views.payroll_history, name='payroll-history'),
    path('payroll-history/<int:pk>/', views.payroll_history_detail, name='payroll-history-detail'),
    path('tax-brackets/', views.tax_brackets, name='tax-brackets'),
]
