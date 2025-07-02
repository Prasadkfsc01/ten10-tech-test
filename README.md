# 📈 Ten10-TechTest E2E Testing Framework

![Cypress Automation](cypress/fixtures/Ten10-logo.png)

## 🧭 Overview

This Cypress automation framework is designed to **validate the functionality and responsiveness** of the Ten10 Interest Calculator web application through end-to-end (E2E) user journeys.

- Tests are structured using **TypeScript** and the **Page Object Model (POM)** for scalability and maintainability.
- Executed **automatically every night** using **GitHub Actions**.
- Clean and informative test reports are generated with **Mochawesome**.
- Built with extensibility in mind – new features or journeys can be added easily.

## ✅ What's Covered

- 🔐 Login and Logout Scenarios
- 👤 User Registration
- 💰 Interest Calculation (positive and negative flows)
- 🧪 Validation of required fields and error messages
- 🖥️ Responsive UI validation on iPhone/iPad viewports
- 🧭 Navigation and link checks

## 📦 Prerequisites

Make sure the following are installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm (Node Package Manager)](https://www.npmjs.com/)
- (Optional) Docker (for containerized test runs)

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/ten10-tech-test.git
cd ten10-tech-test
```

### 2. Add environment variables

```bash
cp .env.example .env
# Add credentials in .env like:
# username=testuser
# password=testpass
```

Alternatively, set up `cypress.staging.env.json` or `cypress.prod.env.json` for environment-specific config.

### 3. Install dependencies

```bash
npm install
```

---

## 🚀 Running Tests

### Open interactive Cypress runner

```bash
npx cypress open
```

### Run all tests in headless mode

```bash
npx cypress run
```

### Run specific test files

```bash
npx cypress run --spec "cypress/e2e/login/*.cy.ts"
```

---

## 📝 NPM Scripts

Common scripts defined in `package.json`:

```json
  "scripts": {
    "cy:run": "npx cypress run",
    "report:merge": "npx mochawesome-merge cypress/reports/mochawesome/*.json > mochawesome.json",
    "report:generate": "npx marge mochawesome.json --reportDir cypress/reports/mochawesome-report --inline",
    "regression-report": "npm run cy:run && npm run report:merge && npm run report:generate"
  }
```

## 📊 Test Reporting

### Generate reports after test run:

```bash
npm run regression-report
```

Reports are saved under:

- `cypress/reports/html/` — Merged HTML report
- `cypress/screenshots/` — Screenshots on failure
- `cypress/videos/` — Recorded test videos (if enabled)

---

## 🧪 GitHub Actions – Nightly CI Runs

This project includes a CI workflow configured via `/.github/workflows/regression.yml`. It:

- Executes all E2E tests at midnight (00:00)
- Triggers on every push to `main`
- Can be extended to post results in Slack or Teams

To run the same locally:

```bash
npm run cy:run
```

---

## 🧱 Folder Structure

```
ten10-tech-test/
├── cypress/
│   ├── e2e/                    # e2e Tests
        ├── TestCases/          # Test specs grouped by features
        ├── PageObjects/        # Page Object Model classes
        ├── Utils/              # Custom utilities and helpers
│   ├── fixtures/               # Static test data
│   ├── reports/                # HTML + JSON reports
│   ├── screenshots/            # Screenshots (on test failure)
│   ├── videos/                 # Test run recordings
│
├── support/
│   └── commands.ts             # Custom Cypress commands
│   └── selectors.ts            # Centralised file for all element locators
│   └── e2e.ts                  # e2e.ts file
├── .github/workflows/          # CI pipeline config
├── cypress.config.ts           # Main Cypress + reporter config
├── package.json                # NPM scripts and dependencies
└── .env                        # Local environment variables
```

---

## 🧩 Tech Stack

| Tool                 | Role                               |
| -------------------- | ---------------------------------- |
| Cypress              | End-to-end test framework          |
| TypeScript           | Type-safe scripting                |
| Mochawesome          | HTML + JSON test reporting         |
| GitHub Actions       | CI pipeline to run tests nightly   |
| dotenv / custom JSON | Environment configuration handling |

## 📌 Update README

This README file is actively maintained. Please feel free to contribute by suggesting improvements or adding missing details.
