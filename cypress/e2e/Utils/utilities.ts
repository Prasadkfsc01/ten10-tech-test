import { LoginPage } from '../PageObjects/LoginPage';

class Utilities {
  /**
   * Performs a valid login using passed parameters or Cypress.env variables.
   * @param {string} [username] - Optional username, defaults to Cypress.env('username')
   * @param {string} [password] - Optional password, defaults to Cypress.env('password')
   * @param {string} [baseUrl] - Optional baseUrl, defaults to Cypress.env('baseurl')
   */
  validLoginMethod(username?: string, password?: string, baseUrl?: string) {
    const loginPage = new LoginPage();

    const user = username || Cypress.env('username');
    const pass = password || Cypress.env('password');
    const url = baseUrl || Cypress.env('baseurl');

    cy.visit(`${url}/Account/Login`);
    loginPage.assertTitle('Ten10TechTest');
    loginPage.enterLoginUsername(user);
    loginPage.enterLoginPassword(pass);
    loginPage.checkRememberMe();
    loginPage.clickLogin();
    loginPage.assertSuccessfulLogin(user);
  }

  /**
   * Clicks outside the body element to close modals/popups/dropdowns.
   */
  clickOutsideBody() {
    cy.get('body').click(0, 0); // Click at the top-left corner (0,0) of the body
  }

  assertLandingPageUrl(assertedUrl: string) {
    cy.url().should('include', assertedUrl);
  }

  // Generic method to calculate expected interest based on principal, rate, and duration
  calculateExpectedInterest(
    principal: number,
    interestRate: number,
    duration: 'Daily' | 'Monthly' | 'Yearly'
  ): { interest: number; total: number } {
    const rateDecimal = interestRate / 100;

    // Duration-based factor (assumed one period calculation)
    let durationFactor: number;
    if (duration === 'Daily') {
      durationFactor = 1 / 30;
    } else if (duration === 'Yearly') {
      durationFactor = 12;
    } else {
      // Default for 'Monthly'
      durationFactor = 1;
    }

    const interest = parseFloat((principal * rateDecimal * durationFactor).toFixed(2));
    const total = parseFloat((principal + interest).toFixed(2));

    return { interest, total };
  }
}

export default Utilities;
