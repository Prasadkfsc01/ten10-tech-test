Requirements

## Objective: As a product owner, I want to build a responsive interest calculator web application.

Features:

- The application should provide options to choose the duration for interest calculation: Daily, Monthly, and Yearly.
- Users should be able to input the principal amount.
- Users should be able to select the interest rate from a predefined list of rates up to 15%.
- The application should calculate the correct interest based on the selected duration, principal amount, and interest rate.
- The application should display the calculated interest and the total amount including interest.
- All input fields (principal amount, interest rate, duration and consent) are mandatory.
- The application should inform the user if any field is left empty or not selected.
- For simplicity, the calculated interest and total amount should be rounded to two decimal places.
- The application should be responsive and user-friendly.
- Clear error messages should be displayed to guide users in case of missing or incorrect inputs.

## My understanging

The task was to test an Interest Calculator web application that allows users to:

Enter a principal amount
Select interest rate (up to 15%)
Choose a duration (Daily, Monthly, or Yearly)
Calculate interest and total amount
Validate input fields and user interactions
Ensure responsiveness and user-friendly interface
The goal was to simulate end-to-end user journeys and validate both positive and negative flows using Cypress.

## My Approach

- I setup a robust Cypress framework with TypeScript support.
- Created modular Page Object Model classes for maintainability.
- Integrated Mochawesome reporter for clean HTML reports.
- Covered both functional and UI responsiveness tests.
- Focused on critical user journeys that a real user would follow.
- Added Github actions for it to run nightly every nigth and send notifications on Slack for QA to act

My Test cases

Test Cases Implemented

🧾 Login Functionality
✅ Login with valid credentials
✅ Login with invalid credentials
✅ Logout and validate redirection

🧾 Registration Functionality
✅ Register with valid credentials
✅ (To-do) Show error when registering with already existing credentials

🧾 Interest Calculator Functionality [Checks all mandatory fields (principal, rate, duration, consent)]
✅ Happy Path: Should calculate interest correctly with valid inputs
✅ Shows alert \`Please fill in all fields.\` when principal amount is less than 1
✅ Should throw alert message \`Please fill in all fields.\` for missing interest rate field

🧾 Responsiveness Tests
✅ Verified homepage renders correctly on:iPhone X viewport
✅ Verified homepage renders correctly on:iPad viewport

🧾 Homepage Navigation Links
✅ Click on Ten10TechTest → lands on welcome page
✅ Home → welcome page
✅ Privacy → privacy policy
✅ Register → registration page
✅ Login → login page

Notes :
? No option to not select interest duration
? Consent check box is not mandatory

Time Constraints [ Could Be Improved with more time]:

- Add negative tests for input field validations (letters in numeric fields, special characters, etc.)
- Add retry logic wrapper for flaky selectors (if needed)
- Validate Mochawesome report integration in CI output
- Expand Slack notification logic for detailed error reporting
