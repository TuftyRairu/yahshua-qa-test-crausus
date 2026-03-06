// selectors/calculator.selectors.js

export const CalculatorSelectors = {
  heading: 'h1:has-text("Payroll Calculator")',
  employeeSelect: 'select.form-select:nth-of-type(1)',
  monthSelect: 'select.form-select:nth-of-type(2)',
  yearSelect: 'select.form-select:nth-of-type(3)',
  overrideSalary: 'input[type="number"]',
  calculateBtn: 'button[type="submit"]',
  result: {
    // Wait anchor — used to confirm results have loaded before asserting
    container: '.card-header:has-text("Payroll Result")',
    basicSalary: 'td:has-text("Basic Salary") ~ td',
    // SSS row — Employee is 2nd td, Employer is 3rd td
    sssEmployee: 'tr:has-text("SSS") >> td >> nth=1',
    sssEmployer: 'tr:has-text("SSS") >> td >> nth=2',
    // PhilHealth row
    philHealthEmployee: 'tr:has-text("PhilHealth") >> td >> nth=1',
    philHealthEmployer: 'tr:has-text("PhilHealth") >> td >> nth=2',
    // Pag-IBIG row
    pagIbigEmployee: 'tr:has-text("Pag-IBIG") >> td >> nth=1',
    pagIbigEmployer: 'tr:has-text("Pag-IBIG") >> td >> nth=2',
    // Income Tax row
    incomeTax: 'tr:has-text("Income Tax") >> td >> nth=1',
    // Summary
    totalDeductions: '.h4.text-danger',
    netPay: '.display-5',
    errorMessage: '.alert-danger, :has-text("Calculation failed")',
  },
};
