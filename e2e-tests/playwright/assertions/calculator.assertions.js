// assertions/calculator.assertions.js
import { expect } from "@playwright/test";
import { NEGATIVE_PESO_FORMAT, BACKEND_ERROR_SYNTAX, STRIP_PESO } from "../utils/regex/common.regex.js";
import { CalculatorSelectors } from "../selectors/calculator.selectors.js";

export async function assertCalculatorPageVisible(page) {
  await expect(page.getByRole("heading", { name: "Payroll Calculator" })).toBeVisible();
}

/**
 * Waits for the payroll result card to appear before asserting values
 */
export async function assertPayrollResultLoaded(page) {
  await expect(page.locator(CalculatorSelectors.result.container)).toBeVisible({ timeout: 15000 });
}

export async function assertPayrollValue(page, selector, expectedAmount) {
  // Wait for result container to be visible first
  await expect(page.locator(CalculatorSelectors.result.container)).toBeVisible({ timeout: 15000 });

  const locator = page.locator(selector);
  await expect(locator).toBeVisible();

  const text = await locator.textContent();
  const actual = parseFloat(text.replace(STRIP_PESO, ""));
  expect(actual).toBeCloseTo(expectedAmount, 2);
}

export async function assertNetPayNotNegative(page, netPaySelector) {
  await expect(page.locator(CalculatorSelectors.result.container)).toBeVisible({ timeout: 15000 });
  const text = await page.locator(netPaySelector).textContent();
  expect(text).not.toMatch(NEGATIVE_PESO_FORMAT);
}

export async function assertNoBackendErrorExposed(page) {
  const bodyText = await page.locator("body").textContent();
  expect(bodyText).not.toMatch(BACKEND_ERROR_SYNTAX);
}

export async function assertCalculatorValidationError(page) {
  const errorLocator = page.locator('.alert-danger, :has-text("Calculation failed")');
  await expect(errorLocator).toBeVisible();
}

export async function assertCalculationFailed(page) {
  await expect(page.locator(':has-text("Calculation failed")')).toBeVisible();
}
