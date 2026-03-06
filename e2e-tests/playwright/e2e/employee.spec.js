// specs/employee.spec.js
import { test, expect } from "@playwright/test";
import { EmployeesPage } from "../pages/employee.page.js";
import EmployeeData from "../fixtures/employee.data.json" assert { type: "json" };
import {
  assertEmployeesPageVisible,
  assertEmployeeRowVisible,
  assertAddEmployeeFormVisible,
  assertUpdateEmployeeFormVisible,
  assertEmployeeValidationError,
  assertCleanErrorMessage,
} from "../assertions/employee.assertions.js";

test.describe("Employee Management", () => {
  let employeesPage;

  test.beforeEach(async ({ page }) => {
    employeesPage = new EmployeesPage(page);
    await employeesPage.goto();
    await assertEmployeesPageVisible(page);
  });

  // ── Happy Path ──────────────────────────────
  test("should successfully add a new employee", async ({ page }) => {
    await employeesPage.clickAddEmployee();
    await assertAddEmployeeFormVisible(page);
    await employeesPage.fillForm(EmployeeData.valid);
    await employeesPage.submitAddForm();
    await assertEmployeesPageVisible(page);
  });

  test("should successfully update an existing employee", async ({ page }) => {
    await employeesPage.clickEdit(0);
    await assertUpdateEmployeeFormVisible(page);
    await employeesPage.fillForm(EmployeeData.update);
    await employeesPage.submitUpdateForm();
    await assertEmployeesPageVisible(page);
  });

  test("should successfully delete an employee", async ({ page }) => {
    const rowsBefore = await employeesPage.getTableRows();
    await expect(rowsBefore.first()).toBeVisible({ timeout: 10000 });
    const countBefore = await rowsBefore.count();
    await employeesPage.clickDelete(0);
    const rowsAfter = await employeesPage.getTableRows();
    await expect(rowsAfter).toHaveCount(countBefore - 1);
  });

  // ── Validation ──────────────────────────────
  test("should show validation error when submitting empty form", async ({ page }) => {
    // BUG: Form uses native HTML5 `required` validation (browser tooltip) instead
    // of a custom .alert-danger element. Marked as expected failure until fixed.
    test.fail();
    await employeesPage.clickAddEmployee();
    await assertAddEmployeeFormVisible(page);
    await employeesPage.submitAddForm();
    await assertEmployeeValidationError(page);
  });

  test("should not accept special characters in name fields", async ({ page }) => {
    await employeesPage.clickAddEmployee();
    await employeesPage.fillForm({
      ...EmployeeData.valid,
      firstName: EmployeeData.invalid.specialCharNames,
      lastName: EmployeeData.invalid.specialCharNames,
    });
    await employeesPage.submitAddForm();
    await assertEmployeeValidationError(page);
  });

  test("should not accept invalid email format", async ({ page }) => {
    // BUG: Form uses native HTML5 `type="email"` validation (browser tooltip) instead
    // of a custom .alert-danger element. Marked as expected failure until fixed.
    test.fail();
    await employeesPage.clickAddEmployee();
    await employeesPage.fillForm({
      ...EmployeeData.valid,
      email: EmployeeData.invalid.invalidEmail,
    });
    await employeesPage.submitAddForm();
    await assertEmployeeValidationError(page);
  });

  test("should not accept negative salary", async ({ page }) => {
    // BUG: Form uses native HTML5 `min="0"` validation (browser tooltip) instead
    // of a custom .alert-danger element. Marked as expected failure until fixed.
    test.fail();
    await employeesPage.clickAddEmployee();
    await employeesPage.fillForm({
      ...EmployeeData.valid,
      monthlySalary: EmployeeData.invalid.negativeSalary,
    });
    await employeesPage.submitAddForm();
    await assertEmployeeValidationError(page);
  });

  test("should not accept future date for Date Hired", async ({ page }) => {
    await employeesPage.clickAddEmployee();
    await employeesPage.fillForm({
      ...EmployeeData.valid,
      dateHired: EmployeeData.invalid.futureDateHired,
    });
    await employeesPage.submitAddForm();
    await assertEmployeeValidationError(page);
  });

  test("should not accept extremely large salary", async ({ page }) => {
    await employeesPage.clickAddEmployee();
    await employeesPage.fillForm({
      ...EmployeeData.valid,
      monthlySalary: EmployeeData.invalid.extremelyLargeSalary,
    });
    await employeesPage.submitAddForm();
    await assertEmployeeValidationError(page);
  });

  test("should show clean error message without raw backend syntax", async ({ page }) => {
    await employeesPage.clickAddEmployee();
    await employeesPage.submitAddForm();
    await assertCleanErrorMessage(page);
  });
});
