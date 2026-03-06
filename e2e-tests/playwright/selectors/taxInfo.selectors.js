// selectors/taxInfo.selectors.js

export const TaxInfoSelectors = {
  heading: 'h1:has-text("Tax Information")',
  taxTable: "table.table",
  taxTableHeader: 'th:has-text("Annual Taxable Income")',
  taxTableRows: "table tbody tr",
  sssSection: ':has-text("SSS Contributions")',
  philHealthSection: ':has-text("PhilHealth")',
  pagIbigSection: ':has-text("Pag-IBIG")',
};
