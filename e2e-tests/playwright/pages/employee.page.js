// pageObjects/employee.page.js
import { EmployeeSelectors } from "../selectors/employee.selectors.js";
import { fillEmployeeForm } from "../utils/helpers/employee.helper.js";

export class EmployeesPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/employees");
  }

  async getHeading() {
    return this.page.locator(EmployeeSelectors.heading);
  }

  async clickAddEmployee() {
    await this.page.locator(EmployeeSelectors.addEmployeeBtn).click();
  }

  async fillForm(data) {
    await fillEmployeeForm(this.page, data);
  }

  async submitAddForm() {
    await this.page.locator(EmployeeSelectors.form.submitBtn).click();
  }

  async submitUpdateForm() {
    await this.page.locator(EmployeeSelectors.form.updateBtn).click();
  }

  async clickCancel() {
    await this.page.locator(EmployeeSelectors.form.cancelBtn).click();
  }

  async clickEdit(index = 0) {
    await this.page.locator(EmployeeSelectors.editBtn).nth(index).click();
  }

  async clickDelete(index = 0) {
    await this.page.locator(EmployeeSelectors.deleteBtn).nth(index).click();
    // Confirm the Bootstrap delete modal
    await this.page.locator(".modal.show .btn-danger").click();
  }

  async getTableRows() {
    return this.page.locator(EmployeeSelectors.tableRows);
  }
}
