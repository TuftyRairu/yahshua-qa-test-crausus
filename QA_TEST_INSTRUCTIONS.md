# QA Engineer Assessment — PH Payroll Calculator

## Overview

You are evaluating a Philippine payroll calculator application. Your task is to thoroughly test the application, identify bugs, document them, and write automated tests to catch regressions.

**Time Limit:** 4 hours
**Submission:** Fork this repo, add your findings, open a PR.

---

## Application Under Test

A full-stack payroll calculator that computes:
- Monthly basic salary
- SSS contributions (employer + employee)
- PhilHealth contributions (employer + employee)
- Pag-IBIG / HDMF contributions
- Income tax withholding (TRAIN Law)
- Net pay

---

## Your Tasks

### Task 1: Manual Exploratory Testing (60 min)

Explore the application and document any bugs you find. For each bug:

1. **Title** — Short descriptive name
2. **Severity** — Critical / High / Medium / Low
3. **Steps to Reproduce** — Numbered steps
4. **Expected Result** — What should happen
5. **Actual Result** — What actually happens
6. **Evidence** — Screenshot, API response, console error

### Task 2: API Testing (45 min)

Using Postman, curl, or a tool of your choice:
- Test all API endpoints (`/api/employees/`, `/api/calculate-payroll/`, `/api/payroll-history/`, `/api/tax-brackets/`)
- Test boundary conditions for salary values
- Test with invalid/missing data
- Document any unexpected responses (wrong status codes, wrong data, etc.)

### Task 3: Write Automated Tests (75 min)

Write at least **5 automated tests** using either:
- Cypress (see `e2e-tests/cypress/`)
- Playwright (see `e2e-tests/playwright/`)
- Or pytest for backend API tests

Your tests should cover both happy paths and edge cases.

### Task 4: Bug Report (30 min)

Compile a formal bug report document (`BUG_REPORT.md`) with all findings.

---

## Philippine Payroll Rules (Reference)

### SSS (Social Security System)
- Employee: 4.5% of monthly salary credit (max contribution ≈ ₱900/month at ₱20,000 MSC)
- Employer: 9.5% of monthly salary credit
- Salary ceiling: ₱20,000

### PhilHealth
- Total: 5% of basic salary (split 50/50 employer/employee)
- Minimum monthly salary base: ₱10,000
- Maximum monthly salary base: ₱100,000

### Pag-IBIG / HDMF
- Employee: 2% of monthly salary (max ₱200/month if salary > ₱5,000)
- Employer: 2% of monthly salary

### Income Tax (TRAIN Law 2023)
| Annual Taxable Income | Tax Rate |
|---|---|
| Up to ₱250,000 | 0% (tax exempt) |
| ₱250,001 – ₱400,000 | 15% on excess over ₱250,000 |
| ₱400,001 – ₱800,000 | ₱22,500 + 20% on excess over ₱400,000 |
| ₱800,001 – ₱2,000,000 | ₱102,500 + 25% on excess over ₱800,000 |
| ₱2,000,001 – ₱8,000,000 | ₱402,500 + 30% on excess over ₱2,000,000 |
| Over ₱8,000,000 | ₱2,202,500 + 35% on excess over ₱8,000,000 |

---

## Hints

- Pay close attention to boundary values in tax calculations.
- Test what happens when you enter unusual or invalid data in forms.
- Check HTTP status codes — they should match REST conventions.
- Verify calculations match the official TRAIN Law tax table above.

---

## Evaluation Criteria

| Area | Weight |
|---|---|
| Bug identification completeness | 30% |
| Bug report quality | 20% |
| Test coverage & quality | 30% |
| Test organization & maintainability | 20% |

Good luck!
