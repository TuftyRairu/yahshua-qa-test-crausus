// utils/helpers/calculator.helper.js

/**
 * Selects employee, month, and year on the Calculator page.
 * If no employee is provided, the first available employee is auto-selected.
 */
export async function selectPayrollOptions(page, { employee, month, year } = {}) {
  const empCombobox = page.getByRole("combobox").nth(0);

  // Wait for the employee list to finish loading (more than just the placeholder option)
  const { expect } = await import("@playwright/test");
  await expect(empCombobox.locator("option").nth(1)).toBeAttached({ timeout: 10000 });

  if (employee) {
    // Use evaluate to find the option value by partial label text, since
    // selectOption({ label: RegExp }) is not universally supported.
    const optionValue = await empCombobox.evaluate((el, name) => {
      const match = Array.from(el.options).find(o => o.text.includes(name));
      return match ? match.value : null;
    }, employee);
    if (!optionValue) throw new Error(`No employee option found matching: ${employee}`);
    await empCombobox.selectOption(optionValue);
  } else {
    // Auto-select the first real employee (index 1 skips the blank placeholder)
    await empCombobox.selectOption({ index: 1 });
  }

  if (month) {
    await page.getByRole("combobox").nth(1).selectOption(month);
  }
  if (year) {
    await page.getByRole("combobox").nth(2).selectOption(year);
  }
}

/**
 * Sets override salary on the Calculator page
 */
export async function setOverrideSalary(page, salary) {
  await page.locator('input[type="number"]').fill(String(salary));
}

/**
 * Computes expected monthly SSS employee share
 */
export function computeSSS(monthlySalary) {
  const maxMSC = 20000;
  const minMSC = 3000;
  const employeeRate = 0.045;
  const msc = Math.min(Math.max(monthlySalary, minMSC), maxMSC);
  return parseFloat((msc * employeeRate).toFixed(2));
}

/**
 * Computes expected monthly PhilHealth employee share
 */
export function computePhilHealth(monthlySalary) {
  const salaryFloor = 10000;
  const salaryCeiling = 100000;
  const employeeRate = 0.025;
  const base = Math.min(Math.max(monthlySalary, salaryFloor), salaryCeiling);
  return parseFloat((base * employeeRate).toFixed(2));
}

/**
 * Computes expected monthly Pag-IBIG employee share
 */
export function computePagIbig(monthlySalary) {
  const maxShare = 200;
  const rate = 0.02;
  if (monthlySalary <= 5000) return parseFloat((monthlySalary * rate).toFixed(2));
  return maxShare;
}

/**
 * Computes expected monthly Income Tax based on TRAIN Law
 */
export function computeIncomeTax(monthlySalary) {
  const annual = monthlySalary * 12;
  let annualTax = 0;

  if (annual <= 250000) {
    annualTax = 0;
  } else if (annual <= 400000) {
    annualTax = (annual - 250000) * 0.15;
  } else if (annual <= 800000) {
    annualTax = 22500 + (annual - 400000) * 0.20;
  } else if (annual <= 2000000) {
    annualTax = 102500 + (annual - 800000) * 0.25;
  } else if (annual <= 8000000) {
    annualTax = 402500 + (annual - 2000000) * 0.30;
  } else {
    annualTax = 2202500 + (annual - 8000000) * 0.35;
  }

  return parseFloat((annualTax / 12).toFixed(2));
}

/**
 * Computes full payroll breakdown for a given monthly salary
 */
export function computePayroll(monthlySalary) {
  const sss = computeSSS(monthlySalary);
  const philHealth = computePhilHealth(monthlySalary);
  const pagIbig = computePagIbig(monthlySalary);
  const incomeTax = computeIncomeTax(monthlySalary);
  const totalDeductions = parseFloat((sss + philHealth + pagIbig + incomeTax).toFixed(2));
  const netPay = parseFloat((monthlySalary - totalDeductions).toFixed(2));
  return { sss, philHealth, pagIbig, incomeTax, totalDeductions, netPay };
}

/**
 * Formats a number to Philippine Peso format
 */
export function formatToPeso(amount) {
  return `₱${amount.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
