from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('position', models.CharField(max_length=100)),
                ('department', models.CharField(max_length=100)),
                ('employment_type', models.CharField(
                    choices=[('regular', 'Regular'), ('contractual', 'Contractual'), ('probationary', 'Probationary')],
                    default='regular',
                    max_length=20,
                )),
                ('monthly_salary', models.DecimalField(decimal_places=2, max_digits=12)),
                ('date_hired', models.DateField()),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={'ordering': ['last_name', 'first_name']},
        ),
        migrations.CreateModel(
            name='PayrollCalculation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('period_month', models.IntegerField()),
                ('period_year', models.IntegerField()),
                ('basic_salary', models.DecimalField(decimal_places=2, max_digits=12)),
                ('sss_employee', models.DecimalField(decimal_places=2, max_digits=10)),
                ('sss_employer', models.DecimalField(decimal_places=2, max_digits=10)),
                ('philhealth_employee', models.DecimalField(decimal_places=2, max_digits=10)),
                ('philhealth_employer', models.DecimalField(decimal_places=2, max_digits=10)),
                ('pagibig_employee', models.DecimalField(decimal_places=2, max_digits=10)),
                ('pagibig_employer', models.DecimalField(decimal_places=2, max_digits=10)),
                ('income_tax', models.DecimalField(decimal_places=2, max_digits=10)),
                ('total_deductions', models.DecimalField(decimal_places=2, max_digits=12)),
                ('net_pay', models.DecimalField(decimal_places=2, max_digits=12)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('employee', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE,
                    related_name='payroll_calculations',
                    to='payroll_app.employee',
                )),
            ],
            options={'ordering': ['-period_year', '-period_month', '-created_at']},
        ),
        migrations.AddConstraint(
            model_name='payrollcalculation',
            constraint=models.UniqueConstraint(
                fields=['employee', 'period_month', 'period_year'],
                name='unique_employee_period',
            ),
        ),
    ]
