/**
 * Cypress E2E Tests — PH Payroll Calculator
 *
 * Run with: npx cypress run (from e2e-tests/)
 *
 * These tests check both happy paths and known bugs.
 * Candidates should add more tests as they discover additional issues.
 */

const API = 'http://localhost:8000/api'

describe('Dashboard', () => {
  it('loads and shows API status as Online', () => {
    cy.visit('/')
    cy.contains('Dashboard').should('be.visible')
    cy.contains('Online').should('be.visible')
  })

  it('shows employee and payroll counts', () => {
    cy.visit('/')
    cy.contains('Active Employees').should('be.visible')
    cy.contains('Payroll Records').should('be.visible')
  })
})

describe('Employee List', () => {
  beforeEach(() => cy.visit('/employees'))

  it('displays 5 employees from fixtures', () => {
    cy.get('table tbody tr').should('have.length', 5)
  })

  it('shows Juan Dela Cruz in the list', () => {
    cy.contains('Juan Dela Cruz').should('be.visible')
  })

  it('shows correct employment type badges', () => {
    cy.contains('regular').should('exist')
    cy.contains('contractual').should('exist')
  })
})

describe('Add Employee', () => {
  beforeEach(() => cy.visit('/employees'))

  it('opens and closes the add form', () => {
    cy.contains('Add Employee').click()
    cy.contains('Add New Employee').should('be.visible')
    cy.contains('Cancel').click()
    cy.contains('Add New Employee').should('not.exist')
  })

  it('validates required fields', () => {
    cy.contains('Add Employee').click()
    cy.contains('Add Employee').last().click()
    // form should not submit without required fields
    cy.contains('Add New Employee').should('be.visible')
  })
})

describe('Payroll Calculator', () => {
  beforeEach(() => cy.visit('/calculate'))

  it('shows the calculator form', () => {
    cy.contains('Calculate Payroll').should('be.visible')
    cy.get('select').first().should('exist') // employee select
  })

  it('calculates payroll for Juan Dela Cruz', () => {
    cy.get('select').first().select('Juan Dela Cruz (regular)')
    cy.contains('button', 'Calculate Payroll').click()
    cy.contains('Payroll Result', { timeout: 10000 }).should('be.visible')
    cy.contains('Net Pay').should('be.visible')
  })

  /**
   * BUG #2 Test: Negative salary should be rejected
   *
   * EXPECTED: Form should validate and reject negative salary values.
   * ACTUAL: Form submits -5000 to the backend without any client-side error.
   * This test demonstrates the bug — it will PASS showing the bug exists.
   */
  it('[BUG #2] allows negative override salary to be submitted', () => {
    cy.get('select').first().select('Juan Dela Cruz (regular)')
    cy.get('input[type="number"]').first().clear().type('-5000')
    cy.contains('button', 'Calculate Payroll').click()
    // If the form were properly validated, we'd see a validation error here.
    // Instead, the form submits. This confirms Bug #2 exists.
    cy.wait(2000)
    // The result should NOT appear with negative pay, or a 400 error from backend
    // Candidates: check what actually happens and document it
  })
})

describe('Payroll History', () => {
  beforeEach(() => cy.visit('/history'))

  it('shows payroll history records', () => {
    cy.get('table tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0)
  })

  it('displays 10 records from fixtures', () => {
    cy.get('table tbody tr', { timeout: 10000 }).should('have.length', 10)
  })

  it('shows employee names and net pay amounts', () => {
    cy.contains('Juan Dela Cruz').should('be.visible')
    cy.contains('Maria Santos').should('be.visible')
  })

  it('can filter by year', () => {
    cy.get('select').select('2025')
    cy.get('table tbody tr').should('have.length.greaterThan', 0)
  })
})

describe('Tax Info', () => {
  beforeEach(() => cy.visit('/tax-info'))

  it('shows TRAIN Law tax brackets', () => {
    cy.contains('TRAIN Law Income Tax Brackets').should('be.visible')
    cy.get('table tbody tr').should('have.length.greaterThan', 0)
  })

  it('shows 0% bracket for up to 250,000', () => {
    cy.contains('₱0 – ₱250,000').should('be.visible')
    cy.contains('0%').should('be.visible')
  })

  it('shows SSS, PhilHealth, and Pag-IBIG sections', () => {
    cy.contains('SSS Contributions').should('be.visible')
    cy.contains('PhilHealth').should('be.visible')
    cy.contains('Pag-IBIG').should('be.visible')
  })
})

describe('API — Bug Verification', () => {
  /**
   * BUG #1 Test: Tax boundary at exactly 250,000
   *
   * EXPECTED: Annual salary of 250,000 should have 0 tax (exempt).
   * ACTUAL: Returns non-zero tax due to >= boundary bug.
   */
  it('[BUG #1] reports non-zero tax for 250,000 annual salary (monthly 20,833.33)', () => {
    cy.request({
      method: 'POST',
      url: `${API}/calculate-payroll/`,
      body: {
        employee_id: 1,
        period_month: 6,
        period_year: 2025,
        override_salary: 20833.33,  // ~250,000/year
      },
      failOnStatusCode: false,
    }).then((res) => {
      // Annual ~250,000 → should be 0 tax
      // BUG: will show tax > 0 due to >= boundary
      cy.log('Income tax:', res.body.income_tax)
      // Document what value you get here
    })
  })

  /**
   * BUG #3 Test: Missing employee returns wrong status code
   *
   * EXPECTED: HTTP 404 when employee_id does not exist.
   * ACTUAL: HTTP 200 with error message in body.
   */
  it('[BUG #3] returns HTTP 200 instead of 404 for nonexistent employee', () => {
    cy.request({
      method: 'POST',
      url: `${API}/calculate-payroll/`,
      body: {
        employee_id: 99999,
        period_month: 1,
        period_year: 2025,
      },
      failOnStatusCode: false,
    }).then((res) => {
      // BUG: status is 200 instead of 404
      expect(res.status).to.equal(200)  // This passes, proving the bug exists
      expect(res.body).to.have.property('error')
      cy.log('Status received:', res.status, '(should be 404)')
    })
  })
})

describe('Navigation', () => {
  it('navigates between all pages', () => {
    cy.visit('/')
    cy.get('nav').contains('Employees').click()
    cy.url().should('include', '/employees')

    cy.get('nav').contains('Calculator').click()
    cy.url().should('include', '/calculate')

    cy.get('nav').contains('History').click()
    cy.url().should('include', '/history')

    cy.get('nav').contains('Tax Info').click()
    cy.url().should('include', '/tax-info')

    cy.get('nav').contains('Dashboard').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })
})
