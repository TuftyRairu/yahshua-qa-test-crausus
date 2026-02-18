# E2E Test Scaffolding

This directory contains starter E2E test suites for both Cypress and Playwright.
Candidates may choose either framework for their automated tests.

## Prerequisites

```bash
# Make sure the app is running first
docker-compose up --build -d
```

## Cypress

```bash
cd e2e-tests
npm install
npx cypress open        # interactive mode
npx cypress run         # headless mode
```

## Playwright

```bash
cd e2e-tests
npm install
npx playwright install
npx playwright test                     # run all
npx playwright test --ui                # interactive mode
npx playwright test tests/payroll.spec.js
```

## Test Coverage Goals

Candidates should write tests that cover:

1. **Happy paths** — normal, expected workflows
2. **Boundary conditions** — edge values (0, negative, max)
3. **Error states** — invalid data, missing fields, server errors
4. **Navigation** — all routes accessible
5. **Data integrity** — correct calculations displayed

## Existing Test Files

- `cypress/e2e/payroll.cy.js` — Cypress starter tests
- `playwright/tests/payroll.spec.js` — Playwright starter tests

Both files include tests that intentionally test for known bugs.
Candidates should find additional bugs and add tests for them.
