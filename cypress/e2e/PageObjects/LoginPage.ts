import Selectors from '../../support/Selectors';
const selectors = new Selectors();

export class LoginPage {
  visit(url: string) {
    cy.visit(url);
  }

  assertTitle(expectedTitle: string) {
    cy.get(selectors.loginPageSelectors.titleLogo, { timeout: 5000 }).should(
      'have.text',
      expectedTitle
    );
  }

  enterLoginUsername(username: string) {
    cy.get(selectors.loginPageSelectors.usernameInput).clear().type(username);
  }

  enterLoginPassword(password: string) {
    cy.get(selectors.loginPageSelectors.passwordInput).clear().type(password);
  }

  checkRememberMe() {
    cy.get(selectors.loginPageSelectors.rememberMeCheckbox).check();
  }

  clickLogin() {
    cy.get(selectors.loginPageSelectors.submitButton, { timeout: 6000 }).click({ force: true });
  }

  assertSuccessfulLogin(username: string) {
    cy.get(selectors.loginPageSelectors.welcomeText, { timeout: 10000 })
      .contains(`Hello ${username}!`)
      .should('be.visible');
  }

  assertLoginError(message: string) {
    cy.get(selectors.loginPageSelectors.invalidErrorMessage, { timeout: 10000 })
      .should('be.visible')
      .and('contain', message);
  }

  clickOnLogoutButton() {
    cy.get(selectors.loginPageSelectors.logoutButton).click();
  }

  // Registration methods

  clickRegisterButtonOnHome() {
    cy.get(selectors.registrationPageSelectors.registerButtonOnHome).click();
  }

  assertRegistrationPageHeader(expectedText: string) {
    cy.get(selectors.registrationPageSelectors.pageHeader).should('have.text', expectedText);
  }

  enterRegisterUsername(username: string) {
    cy.get(selectors.registrationPageSelectors.usernameInput).clear().type(username);
  }

  enterRegisterPassword(password: string) {
    cy.get(selectors.registrationPageSelectors.passwordInput).clear().type(password);
  }

  enterConfirmPassword(confirmPassword: string) {
    cy.get(selectors.registrationPageSelectors.confirmPasswordInput).clear().type(confirmPassword);
  }

  clickRegisterButtonSubmit() {
    cy.get(selectors.registrationPageSelectors.registerSubmitButton).click();
  }

  assertRegistrationConfirmationPage() {
    this.assertRegistrationPageHeader('Register confirmation');
    cy.get(selectors.registrationPageSelectors.confirmEmailLink)
      .should('have.attr', 'href')
      .and('include', '/Account/ConfirmEmail');
    cy.get(selectors.registrationPageSelectors.alertDismissButton).should(
      'have.text',
      'Thank you for confirming your email.'
    );
  }
}

export default LoginPage;
