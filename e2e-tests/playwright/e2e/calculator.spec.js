// specs/calculator.spec.js
import { test, expect } from "@playwright/test";
import { CalculatorPage } from "../pages/calculator.page.js";
import PayrollData from "../fixtures/calculator.data.json" assert { type: "json" };
import { computePayroll } from "../utils/helpers/calculator.helper.js";
import { CalculatorSelectors } from "../selectors/calculator.selectors.js";
import {
  assertCalculatorPageVisible,
  assertPayrollResultLoaded,
  assertPayrollValue,
  assertNetPayNotNegative,
  assertNoBackendErrorExposed,
  assertCalculatorValidationError,
} from "../assertions/calculator.assertions.js";

test.describe("Payroll Calculator", () => {
  let calculatorPage;

  test.beforeEach(async ({ page }) => {
    calculatorPage = new CalculatorPage(page);
    await calculatorPage.goto();
    await assertCalculatorPageVisible(page);
  });

  // ── Happy Path ──────────────────────────────
  test("should correctly compute payroll for Maria Santos at ₱45,000", async ({ page }) => {
    const { mariaTestCase } = PayrollData;
    await calculatorPage.selectOptions({ employee: "Maria Santos", month: "April", year: "2024" });
    await calculatorPage.setOverrideSalary(mariaTestCase.salary);
    await calculatorPage.calculate();
    await assertPayrollResultLoaded(page);

    await assertPayrollValue(page, CalculatorSelectors.result.sssEmployee, mariaTestCase.sssEmployee);
    await assertPayrollValue(page, CalculatorSelectors.result.philHealthEmployee, mariaTestCase.philHealthEmployee);
    await assertPayrollValue(page, CalculatorSelectors.result.pagIbigEmployee, mariaTestCase.pagIbigEmployee);
    await assertPayrollValue(page, CalculatorSelectors.result.incomeTax, mariaTestCase.incomeTax);
    await assertPayrollValue(page, CalculatorSelectors.result.totalDeductions, mariaTestCase.totalDeductions);
    await assertPayrollValue(page, CalculatorSelectors.result.netPay, mariaTestCase.netPay);
  });

  test("should correctly compute payroll for high salary at ₱450,000", async ({ page }) => {
    const { highSalaryTestCase } = PayrollData;
    await calculatorPage.selectOptions({ employee: "Maria Santos", month: "March", year: "2026" });
    await calculatorPage.setOverrideSalary(highSalaryTestCase.salary);
    await calculatorPage.calculate();
    await assertPayrollResultLoaded(page);

    await assertPayrollValue(page, CalculatorSelectors.result.sssEmployee, highSalaryTestCase.sssEmployee);
    await assertPayrollValue(page, CalculatorSelectors.result.philHealthEmployee, highSalaryTestCase.philHealthEmployee);
    await assertPayrollValue(page, CalculatorSelectors.result.pagIbigEmployee, highSalaryTestCase.pagIbigEmployee);
    await assertPayrollValue(page, CalculatorSelectors.result.incomeTax, highSalaryTestCase.incomeTax);
    await assertPayrollValue(page, CalculatorSelectors.result.netPay, highSalaryTestCase.netPay);
  });

  // ── Government Contribution Caps ────────────
  test("should apply SSS maximum cap of ₱900 for high salary", async ({ page }) => {
    await calculatorPage.selectOptions({ month: "March", year: "2026" });
    await calculatorPage.setOverrideSalary(50000);
    await calculatorPage.calculate();
    await assertPayrollResultLoaded(page);
    await assertPayrollValue(page, CalculatorSelectors.result.sssEmployee, 900);
  });

  test("should apply Pag-IBIG maximum cap of ₱200 for high salary", async ({ page }) => {
    await calculatorPage.selectOptions({ month: "March", year: "2026" });
    await calculatorPage.setOverrideSalary(50000);
    await calculatorPage.calculate();
    await assertPayrollResultLoaded(page);
    await assertPayrollValue(page, CalculatorSelectors.result.pagIbigEmployee, 200);
  });

  test("should apply PhilHealth salary ceiling for ₱450,000 salary", async ({ page }) => {
    await calculatorPage.selectOptions({ month: "March", year: "2026" });
    await calculatorPage.setOverrideSalary(450000);
    await calculatorPage.calculate();
    await assertPayrollResultLoaded(page);
    await assertPayrollValue(page, CalculatorSelectors.result.philHealthEmployee, 2500);
  });

  // ── Boundary Values ─────────────────────────
  for (const [bracketName, bracketData] of Object.entries(PayrollData.boundaryValues)) {
    test(`should compute correct income tax at boundary: ${bracketName}`, async ({ page }) => {
      await calculatorPage.selectOptions({ month: "March", year: "2026" });
      await calculatorPage.setOverrideSalary(bracketData.monthlyEquivalent);
      await calculatorPage.calculate();
      await assertPayrollResultLoaded(page);
      const expected = computePayroll(parseFloat(bracketData.monthlyEquivalent));
      await assertPayrollValue(page, CalculatorSelectors.result.incomeTax, expected.incomeTax);
    });
  }

  // ── Validation / Invalid Inputs ──────────────
  test("should not return negative net pay for very low salary", async ({ page }) => {
    // BUG: Backend does not clamp net pay to 0 — deductions exceed a ₱1 salary,
    // producing a negative net pay. Marked as expected failure until fixed.
    test.fail();
    await calculatorPage.selectOptions({ month: "March", year: "2026" });
    await calculatorPage.setOverrideSalary(1);
    await calculatorPage.calculate();
    await assertPayrollResultLoaded(page);
    await assertNetPayNotNegative(page, CalculatorSelectors.result.netPay);
  });

  test("should not accept negative override salary", async ({ page }) => {
    // BUG: Backend accepts negative override salary without validation.
    // Marked as expected failure until fixed.
    test.fail();
    await calculatorPage.selectOptions({ month: "March", year: "2026" });
    await calculatorPage.setOverrideSalary(-10000);
    await calculatorPage.calculate();
    await assertCalculatorValidationError(page);
  });

  test("should not crash or expose backend error with extremely large salary", async ({ page }) => {
    await calculatorPage.selectOptions({ month: "March", year: "2026" });
    await calculatorPage.setOverrideSalary(9999999999);
    await calculatorPage.calculate();
    await assertNoBackendErrorExposed(page);
  });

  test("should not allow payroll calculation before employee Date Hired", async ({ page }) => {
    // BUG: Pedro Gonzales was hired 2024-01-08; selecting January 2024 (period start
    // 2024-01-01) is before his hire date, but the backend does not enforce this.
    // Marked as expected failure until fixed.
    test.fail();
    await calculatorPage.selectOptions({ employee: "Pedro Gonzales", month: "January", year: "2024" });
    await calculatorPage.calculate();
    await assertCalculatorValidationError(page);
  });
});
