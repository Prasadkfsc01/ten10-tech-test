import { LoginPage } from '../PageObjects/LoginPage';
import Utilities from '../Utils/utilities';
import { LoginTestData } from '../../fixtures/testData';

const loginPage = new LoginPage();
const utilities = new Utilities();

describe.skip('User Login Functionality - Positive and Negative Scenarios', () => {
  const username = Cypress.env('username');
  const password = Cypress.env('password');
  const invalidPassword = Cypress.env('invalidPassword');
  beforeEach(() => {
    const url = Cypress.env('baseurl');
    cy.visit(`${url}/Account/Login`);
  });

  it('Should allow login with valid credentials', () => {
    cy.log('Assert the landing page title');
    loginPage.assertTitle('Ten10TechTest');

    cy.log('Login with valid credentials');
    loginPage.enterLoginUsername(username);
    loginPage.enterLoginPassword(password);
    loginPage.checkRememberMe();
    loginPage.clickLogin();

    cy.log('Assert successful login');
    loginPage.assertSuccessfulLogin(username);
  });

  it('Should not allow login with invalid credentials', () => {
    cy.log('Assert the landing page title');
    loginPage.assertTitle('Ten10TechTest');

    cy.log('Login with valid credentials');
    loginPage.enterLoginUsername(username);
    loginPage.enterLoginPassword(invalidPassword);
    loginPage.checkRememberMe();
    loginPage.clickLogin();

    cy.log('Assert Invalid login Error message');
    loginPage.assertLoginError(LoginTestData.invalidLoginErrorMessage);
  });

  it('Should logout the user and redirect to login', () => {
    utilities.validLoginMethod(username, password);
    cy.log('Assert successful login');
    loginPage.assertSuccessfulLogin(username);

    cy.log('Click on logout button');
    loginPage.clickOnLogoutButton();

    cy.log('Assert user is redirected to login page');
    loginPage.assertTitle('Ten10TechTest');
    utilities.assertLandingPageUrl('/Account/Login');
  });
});

describe.skip('User Registration scenarios ', () => {
  it('Should be able to register with valid credentials', () => {
    cy.visit('http://3.8.242.61/');
    loginPage.clickRegisterButtonOnHome();

    loginPage.assertRegistrationPageHeader('Register');
    loginPage.enterRegisterUsername(LoginTestData.registerUsername);
    loginPage.enterRegisterPassword(LoginTestData.registerPassword);
    loginPage.enterConfirmPassword(LoginTestData.registerConfirmPassword);

    cy.log('Assert registration confirmation page');
    loginPage.clickRegisterButtonSubmit();
    loginPage.assertRegistrationConfirmationPage();
  });

  it('Should see error message for the registered user', () => {
    // TODO - Implement the test case to check for error message when trying to register with an already registered username
  });
});
