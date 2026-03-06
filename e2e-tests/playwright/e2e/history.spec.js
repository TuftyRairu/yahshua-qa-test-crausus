// specs/history.spec.js
import { test, expect } from "@playwright/test";

import { HistoryPage } from "../pages/history.page.js";
import {
  assertHistoryPageVisible,
  assertHistoryRowVisible,
} from "../assertions/history.assertions.js";

test.describe("Payroll History", () => {
  let historyPage;

  test.beforeEach(async ({ page }) => {
    historyPage = new HistoryPage(page);
    await historyPage.goto();
    await assertHistoryPageVisible(page);
  });

  test("should display payroll history records", async ({ page }) => {
    const rows = await historyPage.getTableRows();
    await expect(rows.first()).toBeVisible();
  });

  test("should successfully delete a payroll history record", async ({ page }) => {
    const rowsBefore = await historyPage.getTableRows();
    await expect(rowsBefore.first()).toBeVisible({ timeout: 10000 });
    const countBefore = await rowsBefore.count();
    await historyPage.clickDelete(0);
    const rowsAfter = await historyPage.getTableRows();
    await expect(rowsAfter).toHaveCount(countBefore - 1);
  });
});
