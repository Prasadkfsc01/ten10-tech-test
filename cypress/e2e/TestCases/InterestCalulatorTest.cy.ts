import InterestCalculatorPage from '../PageObjects/InterestCalculatorPage';
import Utilities from 'e2e/Utils/utilities';

const interestCalculatorPage = new InterestCalculatorPage();
const utilities = new Utilities();

describe.skip('Interest Calculator Functionality', () => {
  beforeEach(() => {
    cy.log('Starting login before each test');
    utilities.validLoginMethod();
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes("Cannot read properties of undefined (reading 'toFixed')")) {
        return false;
      }
    });
  });

  it('Should calculate interest correctly with valid inputs', () => {
    const principalAmount = 10000;
    const interestRate = 9;
    const interestDuration = 'Monthly';

    cy.log(`Selecting principal amount: ${principalAmount}`);
    interestCalculatorPage.selectPrincipalAmount(principalAmount);

    cy.log(`Selecting interest rate: ${interestRate}%`);
    interestCalculatorPage.clickSelectInterestRateDropdownButton();
    interestCalculatorPage.selectInterestRateCheckbox(interestRate);
    utilities.clickOutsideBody();

    cy.log(`Selecting interest duration: ${interestDuration}`);
    interestCalculatorPage.selectInterestDuration(interestDuration);

    cy.log('Clicking mandatory consent checkbox');
    interestCalculatorPage.clickMandatoryConsentCheckbox();
    interestCalculatorPage.clickCalculateButton();

    cy.log('Asserting total amount with interest');
    interestCalculatorPage.assertInterestAmount(90.0);
    interestCalculatorPage.assertTotalAmount(10090.0);
  });

  it.only('Shows alert `Please fill in all fields.` when principal amount is less than 1', () => {
    const principalAmount = 0;
    const interestRate = 9;
    const interestDuration = 'Monthly';
    cy.log(`Selecting principal amount: ${principalAmount}`);
    interestCalculatorPage.selectPrincipalAmount(principalAmount);

    cy.log(`Selecting interest rate: ${interestRate}%`);
    interestCalculatorPage.clickSelectInterestRateDropdownButton();
    interestCalculatorPage.selectInterestRateCheckbox(interestRate);
    utilities.clickOutsideBody();

    cy.log(`Selecting interest duration: ${interestDuration}`);
    interestCalculatorPage.selectInterestDuration(interestDuration);

    cy.log('Clicking mandatory consent checkbox');
    interestCalculatorPage.clickMandatoryConsentCheckbox();
    interestCalculatorPage.clickCalculateButton();

    cy.log('Asserting alert for missing interest rate');
    interestCalculatorPage.assertMissingFieldsAlert();
  });

  it('Should throw alert message `Please fill in all fields.` for missing interest rate field', () => {
    const principalAmount = 10000;
    const interestDuration = 'Monthly';

    cy.log(`Selecting principal amount: ${principalAmount}`);
    interestCalculatorPage.selectPrincipalAmount(principalAmount);

    cy.log(`Selecting interest duration: ${interestDuration}`);
    interestCalculatorPage.selectInterestDuration(interestDuration);

    cy.log('Clicking mandatory consent checkbox');
    interestCalculatorPage.clickMandatoryConsentCheckbox();
    interestCalculatorPage.clickCalculateButton();

    cy.log('Asserting alert for missing interest rate');
    interestCalculatorPage.assertMissingFieldsAlert();
  });
});
