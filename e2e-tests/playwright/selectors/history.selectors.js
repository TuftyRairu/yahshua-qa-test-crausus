// selectors/history.selectors.js

export const HistorySelectors = {
  heading: 'h1:has-text("Payroll History")',
  table: "table.table",
  tableRows: "table tbody tr",
  deleteBtn: 'button.btn-outline-danger:has-text("Delete")',
  columns: {
    employee: "td:nth-child(1)",
    period: "td:nth-child(2)",
    basicSalary: "td:nth-child(3)",
    totalDeductions: "td:nth-child(4)",
    netPay: "td:nth-child(5)",
  },
};
