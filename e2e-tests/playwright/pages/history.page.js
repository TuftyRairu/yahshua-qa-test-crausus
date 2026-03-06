// pageObjects/history.page.js
import { HistorySelectors } from "../selectors/history.selectors.js";

export class HistoryPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/history");
  }

  async getHeading() {
    return this.page.locator(HistorySelectors.heading);
  }

  async getTableRows() {
    return this.page.locator(HistorySelectors.tableRows);
  }

  async clickDelete(index = 0) {
    await this.page.locator(HistorySelectors.deleteBtn).nth(index).click();
    // Confirm the Bootstrap delete modal
    await this.page.locator(".modal.show .btn-danger").click();
  }
}
