// specs/taxInfo.spec.js
import { test, expect } from "@playwright/test";
import { TaxInfoPage } from "../pages/taxInfo.page.js";
import taxInfoData from "../fixtures/taxInfo.data.json" assert { type: "json" };
import {
  assertTaxInfoPageVisible,
  assertTaxBracketTableVisible,
  assertTaxBracketCount,
} from "../assertions/taxInfo.assertions.js";

test.describe("Tax Info", () => {
  let taxInfoPage;

  test.beforeEach(async ({ page }) => {
    taxInfoPage = new TaxInfoPage(page);
    await taxInfoPage.goto();
    await assertTaxInfoPageVisible(page);
  });

  test("should display the TRAIN Law tax bracket table", async ({ page }) => {
    await assertTaxBracketTableVisible(page);
  });

  test("should display all 6 tax brackets", async ({ page }) => {
    await assertTaxBracketCount(page, taxInfoData.taxBrackets.length);
  });

  test("should display SSS, PhilHealth and Pag-IBIG contribution sections", async ({ page }) => {
    await expect(page.locator('.card-header:has-text("SSS Contributions")')).toBeVisible();
    await expect(page.locator('.card-header:has-text("PhilHealth")')).toBeVisible();
    await expect(page.locator('.card-header:has-text("Pag-IBIG")')).toBeVisible();
  });
});
