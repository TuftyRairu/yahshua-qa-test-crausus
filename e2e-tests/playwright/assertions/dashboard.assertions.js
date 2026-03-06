// assertions/dashboard.assertions.js
import { expect } from "@playwright/test";

export async function assertDashboardVisible(page) {
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
}

export async function assertApiOnline(page) {
  await expect(page.locator(".badge.bg-success")).toContainText("API Online");
}

export async function assertQuickLinksVisible(page) {
  await expect(page.locator('a:has-text("👥 Manage Employees")')).toBeVisible();
  await expect(page.locator('a:has-text("🧮 Calculate Payroll")')).toBeVisible();
  await expect(page.locator('a:has-text("📋 Payroll History")')).toBeVisible();
  await expect(page.locator('a:has-text("📊 Tax Brackets")')).toBeVisible();
}

export async function assertRecentPayrollRecordsVisible(page) {
  await expect(page.locator(".list-group .list-group-item").first()).toBeVisible();
}
