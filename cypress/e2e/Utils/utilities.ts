import { LoginPage } from '../PageObjects/LoginPage';

class Utilities {
  /**
   * Logs in using provided credentials or defaults from Cypress environment variables.
   * @param username - Optional username; falls back to Cypress.env('username')
   * @param password - Optional password; falls back to Cypress.env('password')
   * @param baseUrl - Optional baseUrl; falls back to Cypress.env('baseurl')
   */
  validLoginMethod(username?: string, password?: string, baseUrl?: string): void {
    const loginPage = new LoginPage();
    const user = username ?? Cypress.env('username');
    const pass = password ?? Cypress.env('password');
    const url = baseUrl ?? Cypress.env('baseurl');

    cy.visit(`${url}/Account/Login`);
    loginPage.assertTitle('Ten10TechTest');
    loginPage.enterLoginUsername(user);
    loginPage.enterLoginPassword(pass);
    loginPage.checkRememberMe();
    loginPage.clickLogin();
    loginPage.assertSuccessfulLogin(user);
  }

  /**
   * Clicks on the top-left corner of the body to close overlays like modals or dropdowns.
   */
  clickOutsideBody(): void {
    cy.get('body').click(0, 0);
  }

  /**
   * Asserts that the current URL contains the expected path.
   * @param assertedUrl - Substring to verify in the URL.
   */
  assertLandingPageUrl(assertedUrl: string): void {
    cy.url().should('include', assertedUrl);
  }

  /**
   * Calculates interest and total amount based on principal, rate, and duration.
   * @param principal - The initial amount
   * @param interestRate - Interest rate (up to 15%)
   * @param duration - 'Daily' | 'Monthly' | 'Yearly'
   * @returns Object containing calculated interest and total
   */
  calculateExpectedInterest(
    principal: number,
    interestRate: number,
    duration: 'Daily' | 'Monthly' | 'Yearly'
  ): { interest: number; total: number } {
    const rateDecimal = interestRate / 100;

    const durationFactor = {
      Daily: 1 / 30,
      Monthly: 1,
      Yearly: 12,
    }[duration];

    const interest = parseFloat((principal * rateDecimal * durationFactor).toFixed(2));
    const total = parseFloat((principal + interest).toFixed(2));

    return { interest, total };
  }
}

export default Utilities;
