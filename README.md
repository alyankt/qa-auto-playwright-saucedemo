# QA Auto Playwright Saucedemo

UI autotests for the SauceDemo web application using Playwright and TypeScript.

## Stack

- TypeScript
- Playwright
- Page Object Model
- GitHub Actions
- Git

## Covered scenarios

- successful login
- negative login validation
- locked out user login
- product list display
- product sorting
- product details page
- add product to cart
- remove product from cart
- checkout form validation
- successful checkout

## Project structure

```text
tests/      - test specs
pages/      - Page Object classes
fixtures/   - test data
docs/       - test documentation
```

## Install

```bash
npm install
npx playwright install
```

## Run tests

```bash
npm test
```

## Run tests in headed mode

```bash
npm run test:headed
```

## Open HTML report

```bash
npm run report
```

## Test documentation

Test cases are stored in:

```text
docs/test-cases.md
```
