// assertions/history.assertions.js
import { expect } from "@playwright/test";

export async function assertHistoryPageVisible(page) {
  await expect(page.getByRole("heading", { name: "Payroll History" })).toBeVisible();
}

export async function assertHistoryRowVisible(page, rowName) {
  await expect(page.getByRole("row", { name: rowName })).toBeVisible();
}

export async function assertHistoryRowCount(page, expectedCount) {
  const rows = page.locator("table tbody tr");
  await expect(rows).toHaveCount(expectedCount);
}
