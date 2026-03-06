// specs/dashboard.spec.js
import { test } from "@playwright/test";
import { DashboardPage } from "../pages/dashboard.page.js";
import {
  assertDashboardVisible,
  assertApiOnline,
  assertQuickLinksVisible,
  assertRecentPayrollRecordsVisible,
} from "../assertions/dashboard.assertions.js";
import {
  assertEmployeesPageVisible,
} from "../assertions/employee.assertions.js";
import {
  assertCalculatorPageVisible,
} from "../assertions/calculator.assertions.js";
import {
  assertHistoryPageVisible,
} from "../assertions/history.assertions.js";
import {
  assertTaxInfoPageVisible,
} from "../assertions/taxInfo.assertions.js";

test.describe("Dashboard", () => {
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    await assertDashboardVisible(page);
  });

  test("should display Dashboard heading and API status", async ({ page }) => {
    await assertDashboardVisible(page);
    await assertApiOnline(page);
  });

  test("should display all Quick Links", async ({ page }) => {
    await assertQuickLinksVisible(page);
  });

  test("should display Recent Payroll Records", async ({ page }) => {
    await assertRecentPayrollRecordsVisible(page);
  });

  test("should navigate to Employees via Manage Employees quick link", async ({ page }) => {
    await dashboardPage.clickManageEmployees();
    await assertEmployeesPageVisible(page);
  });

  test("should navigate to Calculator via Calculate Payroll quick link", async ({ page }) => {
    await dashboardPage.clickCalculatePayroll();
    await assertCalculatorPageVisible(page);
  });

  test("should navigate to History via Payroll History quick link", async ({ page }) => {
    await dashboardPage.clickPayrollHistory();
    await assertHistoryPageVisible(page);
  });

  test("should navigate to Tax Info via Tax Brackets quick link", async ({ page }) => {
    await dashboardPage.clickTaxBrackets();
    await assertTaxInfoPageVisible(page);
  });
});
