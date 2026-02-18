"""
PhilHealth Contribution Calculator

Effective 2023:
- Rate: 5% of monthly basic salary
- Split: 2.5% employee, 2.5% employer
- Floor salary: ₱10,000 (minimum monthly salary base)
- Ceiling salary: ₱100,000 (maximum monthly salary base)
- Pag-IBIG is also computed here for convenience.

Pag-IBIG / HDMF:
- Employee: 2% of monthly salary (max ₱200 if salary > ₱5,000)
- Employer: 2% of monthly salary (max ₱200 if salary > ₱5,000)
"""

from decimal import Decimal


PHILHEALTH_RATE = Decimal('0.05')
PHILHEALTH_FLOOR = Decimal('10000')
PHILHEALTH_CEILING = Decimal('100000')

PAGIBIG_RATE = Decimal('0.02')
PAGIBIG_MAX_CONTRIBUTION = Decimal('200')
PAGIBIG_SALARY_THRESHOLD = Decimal('5000')


def calculate_philhealth(monthly_salary: Decimal) -> dict:
    """
    Calculate PhilHealth contributions.

    Returns:
        dict with 'employee' and 'employer' contribution amounts
    """
    salary = Decimal(str(monthly_salary))
    if salary <= 0:
        return {"employee": Decimal("0.00"), "employer": Decimal("0.00")}

    # Apply floor and ceiling
    capped_salary = max(PHILHEALTH_FLOOR, min(salary, PHILHEALTH_CEILING))
    total = (capped_salary * PHILHEALTH_RATE).quantize(Decimal('0.01'))
    half = (total / 2).quantize(Decimal('0.01'))

    return {
        "employee": half,
        "employer": half,
    }


def calculate_pagibig(monthly_salary: Decimal) -> dict:
    """
    Calculate Pag-IBIG / HDMF contributions.

    Returns:
        dict with 'employee' and 'employer' contribution amounts
    """
    salary = Decimal(str(monthly_salary))
    if salary <= 0:
        return {"employee": Decimal("0.00"), "employer": Decimal("0.00")}

    contribution = (salary * PAGIBIG_RATE).quantize(Decimal('0.01'))

    if salary > PAGIBIG_SALARY_THRESHOLD:
        contribution = min(contribution, PAGIBIG_MAX_CONTRIBUTION)

    return {
        "employee": contribution,
        "employer": contribution,
    }
