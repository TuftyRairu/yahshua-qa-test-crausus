// assertions/taxInfo.assertions.js
import { expect } from "@playwright/test";

export async function assertTaxInfoPageVisible(page) {
  await expect(page.getByRole("heading", { name: "Tax Information" })).toBeVisible();
}

export async function assertTaxBracketTableVisible(page) {
  await expect(
    page.locator('th:has-text("Annual Taxable Income")')
  ).toBeVisible();
}

export async function assertTaxBracketCount(page, expectedCount) {
  const rows = page.locator("table tbody tr");
  await expect(rows).toHaveCount(expectedCount);
}
