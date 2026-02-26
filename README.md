# HomeBuddy Kitchen Remodeling - Automated Tests

Simple automated tests for the HomeBuddy Kitchen Remodeling landing page.

## What is tested

- **Test 1** — User submits valid ZIP code and gets navigated to results page (happy path)
- **Test 2** — ZIP code form validation with empty input, letters, and short ZIP code

## Tech stack

- JavaScript
- Playwright

## How to run

1. Make sure you have Node.js installed (v16 or higher)

2. Clone this repo and install dependancies:
```
npm install
```

3. Install Playwright browsers:
```
npx playwright install chromium
```

4. Run the tests:
```
npx playwright test
```

5. To run tests with browser visible (not headless):
```
npx playwright test --headed
```

## Project structure

```
homebuddy-tests/
├── tests/
│   └── kitchen-remodeling.spec.js    # test cases
├── playwright.config.js               # playwright config
├── package.json
└── README.md
```

## Notes

- Tests use real locators from the HomeBuddy kitchen remodeling page
- ZIP code 10001 (New York) is used as valid test data
- Tests cover TC-001 (happy path) and TC-002 (form validation) from the test documentation
