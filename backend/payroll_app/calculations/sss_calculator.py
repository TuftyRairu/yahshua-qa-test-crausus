"""
SSS (Social Security System) Contribution Calculator

Based on the SSS contribution table effective 2023:
- Monthly Salary Credit (MSC) ceiling: ₱20,000
- Employee share: 4.5% of MSC
- Employer share: 9.5% of MSC
- Minimum MSC: ₱3,000
"""

from decimal import Decimal


SSS_CONTRIBUTION_TABLE = [
    {"salary_range_min": 0,     "salary_range_max": 3249.99,  "msc": 3000},
    {"salary_range_min": 3250,  "salary_range_max": 3749.99,  "msc": 3500},
    {"salary_range_min": 3750,  "salary_range_max": 4249.99,  "msc": 4000},
    {"salary_range_min": 4250,  "salary_range_max": 4749.99,  "msc": 4500},
    {"salary_range_min": 4750,  "salary_range_max": 5249.99,  "msc": 5000},
    {"salary_range_min": 5250,  "salary_range_max": 5749.99,  "msc": 5500},
    {"salary_range_min": 5750,  "salary_range_max": 6249.99,  "msc": 6000},
    {"salary_range_min": 6250,  "salary_range_max": 6749.99,  "msc": 6500},
    {"salary_range_min": 6750,  "salary_range_max": 7249.99,  "msc": 7000},
    {"salary_range_min": 7250,  "salary_range_max": 7749.99,  "msc": 7500},
    {"salary_range_min": 7750,  "salary_range_max": 8249.99,  "msc": 8000},
    {"salary_range_min": 8250,  "salary_range_max": 8749.99,  "msc": 8500},
    {"salary_range_min": 8750,  "salary_range_max": 9249.99,  "msc": 9000},
    {"salary_range_min": 9250,  "salary_range_max": 9749.99,  "msc": 9500},
    {"salary_range_min": 9750,  "salary_range_max": 10249.99, "msc": 10000},
    {"salary_range_min": 10250, "salary_range_max": 10749.99, "msc": 10500},
    {"salary_range_min": 10750, "salary_range_max": 11249.99, "msc": 11000},
    {"salary_range_min": 11250, "salary_range_max": 11749.99, "msc": 11500},
    {"salary_range_min": 11750, "salary_range_max": 12249.99, "msc": 12000},
    {"salary_range_min": 12250, "salary_range_max": 12749.99, "msc": 12500},
    {"salary_range_min": 12750, "salary_range_max": 13249.99, "msc": 13000},
    {"salary_range_min": 13250, "salary_range_max": 13749.99, "msc": 13500},
    {"salary_range_min": 13750, "salary_range_max": 14249.99, "msc": 14000},
    {"salary_range_min": 14250, "salary_range_max": 14749.99, "msc": 14500},
    {"salary_range_min": 14750, "salary_range_max": 15249.99, "msc": 15000},
    {"salary_range_min": 15250, "salary_range_max": 15749.99, "msc": 15500},
    {"salary_range_min": 15750, "salary_range_max": 16249.99, "msc": 16000},
    {"salary_range_min": 16250, "salary_range_max": 16749.99, "msc": 16500},
    {"salary_range_min": 16750, "salary_range_max": 17249.99, "msc": 17000},
    {"salary_range_min": 17250, "salary_range_max": 17749.99, "msc": 17500},
    {"salary_range_min": 17750, "salary_range_max": 18249.99, "msc": 18000},
    {"salary_range_min": 18250, "salary_range_max": 18749.99, "msc": 18500},
    {"salary_range_min": 18750, "salary_range_max": 19249.99, "msc": 19000},
    {"salary_range_min": 19250, "salary_range_max": 19749.99, "msc": 19500},
    {"salary_range_min": 19750, "salary_range_max": None,      "msc": 20000},
]

EMPLOYEE_RATE = Decimal('0.045')
EMPLOYER_RATE = Decimal('0.095')


def _get_msc(monthly_salary: Decimal) -> Decimal:
    """Find the monthly salary credit for a given salary."""
    salary = float(monthly_salary)
    for bracket in SSS_CONTRIBUTION_TABLE:
        max_val = bracket["salary_range_max"]
        if max_val is None or salary <= max_val:
            return Decimal(str(bracket["msc"]))
    return Decimal('20000')


def calculate_sss(monthly_salary: Decimal) -> dict:
    """
    Calculate SSS contributions for employee and employer.

    Returns:
        dict with 'employee' and 'employer' contribution amounts
    """
    salary = Decimal(str(monthly_salary))
    if salary <= 0:
        return {"employee": Decimal("0.00"), "employer": Decimal("0.00")}

    msc = _get_msc(salary)
    employee_contribution = (msc * EMPLOYEE_RATE).quantize(Decimal('0.01'))
    employer_contribution = (msc * EMPLOYER_RATE).quantize(Decimal('0.01'))

    return {
        "employee": employee_contribution,
        "employer": employer_contribution,
    }
