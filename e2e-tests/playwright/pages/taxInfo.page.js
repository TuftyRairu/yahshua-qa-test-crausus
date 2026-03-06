// pageObjects/taxInfo.page.js
import { TaxInfoSelectors } from "../selectors/taxInfo.selectors.js";

export class TaxInfoPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/tax-info");
  }

  async getHeading() {
    return this.page.locator(TaxInfoSelectors.heading);
  }

  async getTaxTableRows() {
    return this.page.locator(TaxInfoSelectors.taxTableRows);
  }

  async getTaxTableHeader() {
    return this.page.locator(TaxInfoSelectors.taxTableHeader);
  }
}
