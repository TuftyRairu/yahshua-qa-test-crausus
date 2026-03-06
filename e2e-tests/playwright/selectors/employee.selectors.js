// selectors/employee.selectors.js

export const EmployeeSelectors = {
  heading: 'h1:has-text("Employees")',
  addEmployeeBtn: 'button:has-text("+ Add Employee")',
  table: "table.table",
  tableRows: "table tbody tr",
  editBtn: 'button.btn-outline-primary:has-text("Edit")',
  deleteBtn: 'button.btn-outline-danger:has-text("Delete")',
  form: {
    firstName: 'input[placeholder="First Name"]',
    lastName: 'input[placeholder="Last Name"]',
    email: 'input[type="email"]',
    position: 'input[placeholder="Position"]',
    department: 'input[placeholder="Department"]',
    employmentType: "select.form-select",
    monthlySalary: 'input[type="number"]',
    dateHired: 'input[type="date"]',
    submitBtn: 'button:has-text("Add Employee")',
    updateBtn: 'button:has-text("Update Employee")',
    cancelBtn: 'button:has-text("Cancel")',
  },
};
