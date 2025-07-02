import Selectors from '../../support/Selectors';
const selectors = new Selectors();

class InterestCalculatorPage {
  /**
   * Sets the principal amount slider to the specified value.
   * @param {number} amount - The principal amount to select (e.g., 10000).
   */
  selectPrincipalAmount(amount: number) {
    cy.get(selectors.interestCalculatorPage.principalAmountSlider)
      .invoke('val', amount)
      .trigger('input');
  }

  /**
   * Clicks the interest rate dropdown button to open the options.
   */
  clickSelectInterestRateDropdownButton() {
    cy.get(selectors.interestCalculatorPage.interestRateDropdownButton).click();
  }

  /**
   * Selects an interest rate checkbox based on the given rate percentage.
   * @param {number} ratePercent - The interest rate to select (e.g., 9 for 9%).
   */
  selectInterestRateCheckbox(ratePercent: number) {
    const selector = selectors.interestCalculatorPage.interestRateCheckbox(ratePercent);
    cy.get(selector).check({ force: true });
  }

  /**
   * Selects the interest duration (Daily, Monthly, Yearly).
   * @param {string} duration - The duration value to select (e.g., "Monthly").
   */
  selectInterestDuration(duration: string) {
    const selector = selectors.interestCalculatorPage.durationOption(duration);
    cy.get(selector, { timeout: 10000 }) // retry if not found
      .should('be.visible') // retry until visible
      .click({ force: true }); // perform the action
  }

  /**
   * Clicks the mandatory consent checkbox.
   */
  clickMandatoryConsentCheckbox() {
    cy.get(selectors.interestCalculatorPage.mandatoryConsentCheckbox).check({ force: true });
  }

  /**
   * Clicks the Calculate button to compute interest.
   */
  clickCalculateButton() {
    cy.get(selectors.interestCalculatorPage.calculateButton).click();
  }

  /**
   * Asserts the displayed interest amount text matches the expected value.
   * @param {number} interestAmount - The expected interest amount (e.g., 90.00).
   */
  assertInterestAmount(interestAmount: number) {
    cy.get(selectors.interestCalculatorPage.interestAmountText).should(
      'contain.text',
      `Interest Amount: ${interestAmount.toFixed(2)}`
    );
  }

  /**
   * Asserts the displayed total amount with interest matches the expected value.
   * @param {number} totalAmount - The expected total amount (e.g., 10090.00).
   */
  assertTotalAmount(totalAmount: number) {
    cy.get(selectors.interestCalculatorPage.totalAmountText).should(
      'contain.text',
      `Total Amount with Interest: ${totalAmount.toFixed(2)}`
    );
  }

  // Alert assertion for missing fields
  assertMissingFieldsAlert() {
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.eq('Please fill in all fields.');
    });
  }
}

export default InterestCalculatorPage;
