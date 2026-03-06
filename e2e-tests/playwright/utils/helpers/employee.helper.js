// utils/helpers/employee.helper.js

/**
 * Fills the Add/Edit Employee form with provided data
 */
export async function fillEmployeeForm(page, data) {
  await page.getByRole("textbox").first().fill(data.firstName);
  await page.getByRole("textbox").nth(1).fill(data.lastName);
  await page.locator('input[type="email"]').fill(data.email);
  await page.getByRole("textbox").nth(3).fill(data.position);
  await page.getByRole("textbox").nth(4).fill(data.department);
  if (data.employmentType) {
    await page.getByRole("combobox").selectOption(data.employmentType);
  }
  await page.getByRole("spinbutton").fill(data.monthlySalary);
  await page.locator('input[type="date"]').fill(data.dateHired);
}
