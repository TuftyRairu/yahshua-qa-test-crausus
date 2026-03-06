// specs/navigation.spec.js
import { test } from "@playwright/test";
import { assertDashboardVisible } from "../assertions/dashboard.assertions.js";
import { assertEmployeesPageVisible } from "../assertions/employee.assertions.js";
import { assertCalculatorPageVisible } from "../assertions/calculator.assertions.js";
import { assertHistoryPageVisible } from "../assertions/history.assertions.js";
import { assertTaxInfoPageVisible } from "../assertions/taxInfo.assertions.js";

test.describe("Navigation", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await assertDashboardVisible(page);
  });

  test("should display the Dashboard page", async ({ page }) => {
    await assertDashboardVisible(page);
  });

  test("should navigate to Employees page via navbar", async ({ page }) => {
    await page.getByRole("link", { name: "Employees", exact: true }).click();
    await assertEmployeesPageVisible(page);
  });

  test("should navigate to Calculator page via navbar", async ({ page }) => {
    await page.getByRole("link", { name: "Calculator", exact: true }).click();
    await assertCalculatorPageVisible(page);
  });

  test("should navigate to History page via navbar", async ({ page }) => {
    await page.getByRole("link", { name: "History", exact: true }).click();
    await assertHistoryPageVisible(page);
  });

  test("should navigate to Tax Info page via navbar", async ({ page }) => {
    await page.getByRole("link", { name: "Tax Info" }).click();
    await assertTaxInfoPageVisible(page);
  });
});
