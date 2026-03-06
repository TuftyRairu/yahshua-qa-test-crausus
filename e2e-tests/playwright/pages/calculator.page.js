// pageObjects/calculator.page.js
import { CalculatorSelectors } from "../selectors/calculator.selectors.js";
import { selectPayrollOptions, setOverrideSalary } from "../utils/helpers/calculator.helper.js";

export class CalculatorPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/calculate");
  }

  async getHeading() {
    return this.page.locator(CalculatorSelectors.heading);
  }

  async selectOptions(options) {
    await selectPayrollOptions(this.page, options);
  }

  async setOverrideSalary(salary) {
    await setOverrideSalary(this.page, salary);
  }

  async calculate() {
    await this.page.getByRole("button", { name: "Calculate Payroll" }).click();
  }

  async getBasicSalary() {
    return this.page.locator(CalculatorSelectors.result.basicSalary).textContent();
  }

  async getSSSEmployee() {
    return this.page.locator(CalculatorSelectors.result.sssEmployee).textContent();
  }

  async getPhilHealthEmployee() {
    return this.page.locator(CalculatorSelectors.result.philHealthEmployee).textContent();
  }

  async getPagIbigEmployee() {
    return this.page.locator(CalculatorSelectors.result.pagIbigEmployee).textContent();
  }

  async getIncomeTax() {
    return this.page.locator(CalculatorSelectors.result.incomeTax).textContent();
  }

  async getTotalDeductions() {
    return this.page.locator(CalculatorSelectors.result.totalDeductions).textContent();
  }

  async getNetPay() {
    return this.page.locator(CalculatorSelectors.result.netPay).textContent();
  }

  async getErrorMessage() {
    return this.page.locator(CalculatorSelectors.result.errorMessage).textContent();
  }
}
