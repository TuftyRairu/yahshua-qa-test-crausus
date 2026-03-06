// assertions/employee.assertions.js
import { expect } from "@playwright/test";
import { BACKEND_ERROR_SYNTAX } from "../utils/regex/common.regex.js";

export async function assertEmployeesPageVisible(page) {
  await expect(page.getByRole("heading", { name: "Employees" })).toBeVisible();
}

export async function assertEmployeeRowVisible(page, rowName) {
  await expect(page.getByRole("row", { name: rowName })).toBeVisible();
}

export async function assertAddEmployeeFormVisible(page) {
  await expect(page.getByRole("button", { name: "Add Employee" })).toBeVisible();
}

export async function assertUpdateEmployeeFormVisible(page) {
  await expect(page.getByRole("button", { name: "Update Employee" })).toBeVisible();
}

export async function assertEmployeeValidationError(page) {
  const errorLocator = page.locator('.invalid-feedback, .alert-danger, [class*="error"]');
  await expect(errorLocator).toBeVisible();
}

export async function assertCleanErrorMessage(page) {
  const bodyText = await page.locator("body").textContent();
  expect(bodyText).not.toMatch(BACKEND_ERROR_SYNTAX);
}
