# SauceDemo QA Automation Framework

## Project Overview
This project is a final QA automation assignment built for the SauceDemo web application using **Playwright + TypeScript**.  
It follows a **Page Object Model (POM)** architecture and a **QA Library** approach to keep test steps reusable, maintainable, and clearly mapped to manual test cases.

The framework covers the core user flows required by the assignment:
- Login
- Products / Inventory
- Cart
- Checkout Step One
- Checkout Step Two / Overview
- Checkout Complete
- Logout

## Objectives Covered
- System analysis of critical user flows
- Happy path and negative scenario coverage
- Reusable QA Library abstractions
- Manual test case design
- Automated Playwright test execution
- HTML reporting with failure artifacts
- GitHub-ready project structure

## Tech Stack
- **Playwright**
- **TypeScript**
- **Node.js**
- **Page Object Model (POM)**
- **Reusable QA Library**
- **Excel-based manual test cases**

## Project Structure
```text
saucedemo-ts-auto-master/
├── pages/
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutStepOnePage.ts
│   ├── CheckoutStepTwoPage.ts
│   └── CheckoutCompletePage.ts
├── qa-library/
│   ├── actions.ts
│   ├── flows.ts
│   ├── validations.ts
│   └── utils.ts
├── test-data/
│   ├── users.ts
│   ├── products.ts
│   └── checkoutData.ts
├── tests/
│   ├── login.spec.ts
│   ├── inventory.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   └── e2e-happy-path.spec.ts
├── reports/
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

## Critical User Flows
1. Valid login with standard user
2. Add one or multiple products to cart
3. Review cart contents and update cart
4. Start checkout from cart
5. Validate required fields in checkout step one
6. Review checkout overview and finish order
7. Return to inventory from complete page
8. Logout from different application states

## Test Coverage Strategy
### Smoke Coverage
- Valid login
- Add product to cart
- Proceed to checkout
- Complete purchase
- Logout

### Regression Coverage
- Inventory interactions
- Cart behavior
- Checkout validations
- Overview and completion screens
- Navigation between key pages

### Negative / Edge Coverage
- Invalid password
- Locked out user
- Blank username
- Blank password
- Missing first name
- Missing last name
- Missing postal code
- Remove all products from cart

## QA Library Approach
The `qa-library` folder contains reusable functions to keep tests modular and avoid duplication.

### Examples
- `login(...)`
- `openLoginPage(...)`
- `addProductsToCart(...)`
- `removeProductFromCart(...)`
- `startCheckout(...)`
- `fillCheckoutInfo(...)`
- `continueCheckout(...)`
- `completeCheckoutFlow(...)`
- `validateCartCount(...)`
- `validateCheckoutOverview(...)`
- `validateOrderCompleted(...)`

This design allows manual test cases and automation scripts to stay aligned and reusable.

## Manual to Automation Mapping
Manual test cases are documented in the Excel file:

**`SauceDemo_Test_Cases.xlsx`**

Each automated test uses the same ID format as the manual case, for example:
- `TC_LOGIN_001`
- `TC_INV_004`
- `TC_CART_003`
- `TC_CHECKOUT1_002`
- `TC_LOGOUT_001`

> Note: the automation suite currently contains one additional overlapping regression check (`TC_COMPLETE_001`) beyond the 30 manual baseline cases. This slightly extends coverage.

## Reporting
The framework is configured to generate:
- Console execution output
- HTML report
- Failure screenshots
- Failure traces

Current Playwright reporter settings:
- `list`
- `html` → output folder: `reports/html-report`

Failure artifact settings in `playwright.config.ts`:
- `screenshot: 'only-on-failure'`
- `trace: 'retain-on-failure'`

## Installation
```bash
npm install
npx playwright install
```

## Run Tests
### Run full suite
```bash
npx playwright test
```

### Run in headed mode
```bash
npx playwright test --headed
```

### Run with Playwright UI mode
```bash
npx playwright test --ui
```

### Run only login tests
```bash
npx playwright test tests/login.spec.ts
```

## View HTML Report
```bash
npx playwright show-report reports/html-report
```

## NPM Scripts
```bash
npm test
npm run test:headed
npm run test:ui
npm run test:login
npm run report
npm run typecheck
```

## Deliverables Included
- Playwright + TypeScript automation framework
- Page Object Model structure
- QA Library reusable actions, validations, and flows
- Test data abstraction
- HTML report configuration
- Manual Excel test case file
- README documentation

## Suggested GitHub Improvements
Before pushing to GitHub, make sure:
- `node_modules/` is ignored
- `.idea/` is ignored
- generated report folders are ignored if not required
- the default branch is `main`

Recommended `.gitignore` entries:
```gitignore
node_modules/
.idea/
playwright-report/
test-results/
reports/html-report/
reports/test-results/
```

## Final Notes
This framework is designed to satisfy the assignment requirements while keeping the project simple, readable, and easy to demonstrate in class.
