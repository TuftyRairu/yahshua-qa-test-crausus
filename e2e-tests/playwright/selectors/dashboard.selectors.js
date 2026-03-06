// selectors/dashboard.selectors.js

export const DashboardSelectors = {
  heading: 'h1:has-text("Dashboard")',
  apiStatus: ".badge.bg-success",
  activeEmployeesCard: ".col-md-3:nth-child(1) .display-4",
  payrollRecordsCard: ".col-md-3:nth-child(2) .display-4",
  departmentsCard: ".col-md-3:nth-child(3) .display-4",
  avgMonthlySalaryCard: ".col-md-3:nth-child(4) .h4",
  quickLinks: {
    manageEmployees: 'a:has-text("👥 Manage Employees")',
    calculatePayroll: 'a:has-text("🧮 Calculate Payroll")',
    payrollHistory: 'a:has-text("📋 Payroll History")',
    taxBrackets: 'a:has-text("📊 Tax Brackets")',
  },
  recentPayrollRecords: ".list-group .list-group-item",
};
