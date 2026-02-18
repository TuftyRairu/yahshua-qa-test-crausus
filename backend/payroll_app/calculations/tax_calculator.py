"""
Philippine Income Tax Calculator — TRAIN Law (2023)

Annual Tax Table:
  0         – 250,000   : 0%
  250,001   – 400,000   : 15% of excess over 250,000
  400,001   – 800,000   : 22,500 + 20% of excess over 400,000
  800,001   – 2,000,000 : 102,500 + 25% of excess over 800,000
  2,000,001 – 8,000,000 : 402,500 + 30% of excess over 2,000,000
  Over 8,000,000        : 2,202,500 + 35% of excess over 8,000,000
"""

from decimal import Decimal


TAX_BRACKETS = [
    {
        "min": 0,
        "max": 250000,
        "base_tax": 0,
        "rate": 0,
        "excess_over": 0,
        "label": "₱0 – ₱250,000",
    },
    {
        "min": 250001,
        "max": 400000,
        "base_tax": 0,
        "rate": 15,
        "excess_over": 250000,
        "label": "₱250,001 – ₱400,000",
    },
    {
        "min": 400001,
        "max": 800000,
        "base_tax": 22500,
        "rate": 20,
        "excess_over": 400000,
        "label": "₱400,001 – ₱800,000",
    },
    {
        "min": 800001,
        "max": 2000000,
        "base_tax": 102500,
        "rate": 25,
        "excess_over": 800000,
        "label": "₱800,001 – ₱2,000,000",
    },
    {
        "min": 2000001,
        "max": 8000000,
        "base_tax": 402500,
        "rate": 30,
        "excess_over": 2000000,
        "label": "₱2,000,001 – ₱8,000,000",
    },
    {
        "min": 8000001,
        "max": None,
        "base_tax": 2202500,
        "rate": 35,
        "excess_over": 8000000,
        "label": "Over ₱8,000,000",
    },
]


def calculate_annual_income_tax(annual_taxable_income: Decimal) -> Decimal:
    """
    Calculate annual income tax based on TRAIN Law brackets.

    BUG #1: The boundary check uses >= 250000 instead of > 250000.
    This causes an annual salary of exactly 250,000 to be taxed at 15%
    when it should be 0% (tax-exempt up to and including 250,000).
    """
    annual_income = Decimal(str(annual_taxable_income))

    # BUG #1: Should be `annual_income > 250000` — using >= incorrectly taxes
    # the 250,000 boundary at the 15% rate instead of leaving it at 0%.
    if annual_income >= Decimal('250000'):
        if annual_income <= Decimal('400000'):
            excess = annual_income - Decimal('250000')
            return (excess * Decimal('0.15')).quantize(Decimal('0.01'))

    if annual_income > Decimal('400000') and annual_income <= Decimal('800000'):
        excess = annual_income - Decimal('400000')
        return (Decimal('22500') + excess * Decimal('0.20')).quantize(Decimal('0.01'))

    if annual_income > Decimal('800000') and annual_income <= Decimal('2000000'):
        excess = annual_income - Decimal('800000')
        return (Decimal('102500') + excess * Decimal('0.25')).quantize(Decimal('0.01'))

    if annual_income > Decimal('2000000') and annual_income <= Decimal('8000000'):
        excess = annual_income - Decimal('2000000')
        return (Decimal('402500') + excess * Decimal('0.30')).quantize(Decimal('0.01'))

    if annual_income > Decimal('8000000'):
        excess = annual_income - Decimal('8000000')
        return (Decimal('2202500') + excess * Decimal('0.35')).quantize(Decimal('0.01'))

    return Decimal('0.00')


def calculate_monthly_withholding_tax(monthly_basic_salary: Decimal) -> Decimal:
    """Calculate monthly withholding tax from monthly basic salary."""
    annual_salary = Decimal(str(monthly_basic_salary)) * Decimal('12')
    annual_tax = calculate_annual_income_tax(annual_salary)
    return (annual_tax / Decimal('12')).quantize(Decimal('0.01'))


def get_tax_brackets():
    """Return the tax brackets for display."""
    return TAX_BRACKETS
