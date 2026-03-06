// pageObjects/dashboard.page.js
import { DashboardSelectors } from "../selectors/dashboard.selectors.js";

export class DashboardPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/");
  }

  async getHeading() {
    return this.page.locator(DashboardSelectors.heading);
  }

  async getApiStatus() {
    return this.page.locator(DashboardSelectors.apiStatus);
  }

  async getActiveEmployeesCount() {
    return this.page.locator(DashboardSelectors.activeEmployeesCard).textContent();
  }

  async getPayrollRecordsCount() {
    return this.page.locator(DashboardSelectors.payrollRecordsCard).textContent();
  }

  async getDepartmentsCount() {
    return this.page.locator(DashboardSelectors.departmentsCard).textContent();
  }

  async getAvgMonthlySalary() {
    return this.page.locator(DashboardSelectors.avgMonthlySalaryCard).textContent();
  }

  async clickManageEmployees() {
    await this.page.locator(DashboardSelectors.quickLinks.manageEmployees).click();
  }

  async clickCalculatePayroll() {
    await this.page.locator(DashboardSelectors.quickLinks.calculatePayroll).click();
  }

  async clickPayrollHistory() {
    await this.page.locator(DashboardSelectors.quickLinks.payrollHistory).click();
  }

  async clickTaxBrackets() {
    await this.page.locator(DashboardSelectors.quickLinks.taxBrackets).click();
  }
}
