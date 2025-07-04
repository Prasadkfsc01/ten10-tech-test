import { LoginPage } from '../PageObjects/LoginPage';
import Utilities from '../Utils/utilities';
import { LoginTestData } from '../../fixtures/testData';

const loginPage = new LoginPage();
const utilities = new Utilities();

describe.skip('🔐 User Login Functionality - Positive and Negative Scenarios', () => {
  const username = Cypress.env('username');
  const password = Cypress.env('password');
  const invalidPassword = Cypress.env('invalidPassword');
  const baseUrl = Cypress.env('baseurl');

  beforeEach(() => {
    cy.visit(`${baseUrl}/Account/Login`);
  });

  it('✅ Should allow login with valid credentials', () => {
    cy.log('🧪 Asserting login page title');
    loginPage.assertTitle('Ten10TechTest');

    cy.log('🔐 Logging in with valid credentials');
    loginPage.enterLoginUsername(username);
    loginPage.enterLoginPassword(password);
    loginPage.checkRememberMe();
    loginPage.clickLogin();

    cy.log('✅ Valid login successful - assert username shown');
    loginPage.assertSuccessfulLogin(username);
  });

  it('❌ Should not allow login with invalid credentials', () => {
    cy.log('🧪 Asserting login page title');
    loginPage.assertTitle('Ten10TechTest');

    cy.log('🔐 Attempting login with invalid password');
    loginPage.enterLoginUsername(username);
    loginPage.enterLoginPassword(invalidPassword);
    loginPage.checkRememberMe();
    loginPage.clickLogin();

    cy.log('⚠️ Asserting invalid login error message');
    loginPage.assertLoginError(LoginTestData.invalidLoginErrorMessage);
  });

  it('🚪 Should logout the user and redirect to login page', () => {
    cy.log('🔐 Performing valid login via utility');
    utilities.validLoginMethod(username, password);

    cy.log('✅ Assert user is logged in');
    loginPage.assertSuccessfulLogin(username);

    cy.log('🚪 Logging out user');
    loginPage.clickOnLogoutButton();

    cy.log('🔁 Verifying redirect to login page');
    loginPage.assertTitle('Ten10TechTest');
    utilities.assertLandingPageUrl('/Account/Login');
  });
});

describe.skip('📝 User Registration Scenarios', () => {
  it('✅ Should register successfully with valid credentials', () => {
    cy.visit(`${Cypress.env('baseurl')}/`);
    loginPage.clickRegisterButtonOnHome();

    cy.log('🧾 Asserting registration page header');
    loginPage.assertRegistrationPageHeader('Register');

    cy.log('📝 Filling registration form');
    loginPage.enterRegisterUsername(LoginTestData.registerUsername);
    loginPage.enterRegisterPassword(LoginTestData.registerPassword);
    loginPage.enterConfirmPassword(LoginTestData.registerConfirmPassword);

    cy.log('🧾 Submitting form and asserting confirmation');
    loginPage.clickRegisterButtonSubmit();
    loginPage.assertRegistrationConfirmationPage();
  });

  it('Should show error when registering with an existing username', () => {
    //  TODO: Implement test for duplicate registration scenario
  });
});
