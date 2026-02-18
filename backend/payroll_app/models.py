from django.db import models


class Employee(models.Model):
    EMPLOYMENT_TYPE_CHOICES = [
        ('regular', 'Regular'),
        ('contractual', 'Contractual'),
        ('probationary', 'Probationary'),
    ]

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    position = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    employment_type = models.CharField(
        max_length=20,
        choices=EMPLOYMENT_TYPE_CHOICES,
        default='regular'
    )
    monthly_salary = models.DecimalField(max_digits=12, decimal_places=2)
    date_hired = models.DateField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['last_name', 'first_name']

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"


class PayrollCalculation(models.Model):
    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        related_name='payroll_calculations'
    )
    period_month = models.IntegerField()  # 1-12
    period_year = models.IntegerField()
    basic_salary = models.DecimalField(max_digits=12, decimal_places=2)

    # Deductions
    sss_employee = models.DecimalField(max_digits=10, decimal_places=2)
    sss_employer = models.DecimalField(max_digits=10, decimal_places=2)
    philhealth_employee = models.DecimalField(max_digits=10, decimal_places=2)
    philhealth_employer = models.DecimalField(max_digits=10, decimal_places=2)
    pagibig_employee = models.DecimalField(max_digits=10, decimal_places=2)
    pagibig_employer = models.DecimalField(max_digits=10, decimal_places=2)
    income_tax = models.DecimalField(max_digits=10, decimal_places=2)

    # Results
    total_deductions = models.DecimalField(max_digits=12, decimal_places=2)
    net_pay = models.DecimalField(max_digits=12, decimal_places=2)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-period_year', '-period_month', '-created_at']
        unique_together = ['employee', 'period_month', 'period_year']

    def __str__(self):
        return f"{self.employee.full_name} - {self.period_month}/{self.period_year}"
