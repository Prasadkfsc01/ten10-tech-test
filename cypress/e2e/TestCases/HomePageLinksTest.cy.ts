import HomePage from '../PageObjects/HomePage';
import Utilities from '../Utils/utilities';

const homePage = new HomePage();
const utilities = new Utilities();

describe('Ten10 Interest Calculator - Navigation Tests', () => {
  beforeEach(() => {
    cy.log('Visiting the Home Page');
    cy.visit(Cypress.env('baseurl'));
  });

  it('Should land on Ten10TechTest page when clicking the brand link', () => {
    cy.log('Clicking on Ten10TechTest brand link');
    homePage.clickOnTen10HomePageLink();
    utilities.assertLandingPageUrl('/');
    homePage.assertTen10HomePageLanding();
  });

  it('Should navigate to Home page via navbar', () => {
    homePage.clickLinkAndAssert('Home', '/', 'Welcome to Ten10 Technical Test Website');
  });

  it('Should navigate to Privacy Policy page', () => {
    homePage.clickOnPrivacyPolicyLink();
    utilities.assertLandingPageUrl('/Home/Privacy');
    homePage.assertHeaderText('Privacy Policy');
  });

  it('Should navigate to Registration page', () => {
    homePage.clickLinkAndAssert('Register', '/Identity/Account/Register', 'Register');
  });

  it('Should navigate to Login page', () => {
    homePage.clickLinkAndAssert(
      'Login',
      '/?area=Views&page=%2FAccount%2FLogin',
      'Welcome to Ten10 Technical Test Website'
    );
  });
});

describe('Ten10TechTest - Responsive Design Checks', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseurl'));
  });

  it('Should render homepage correctly on iPhone X viewport', () => {
    cy.log('Setting viewport to iPhone X dimensions');
    cy.viewport('iphone-x');
    homePage.assertHeaderText('Welcome to Ten10 Technical Test Website');
    homePage.assertLandingPageRegisterText('Register');
  });

  it('Should render homepage correctly on iPad viewport', () => {
    cy.log('Setting viewport to iPad dimensions');
    cy.viewport(820, 1180);
    homePage.assertHeaderText('Welcome to Ten10 Technical Test Website');
    homePage.assertLandingPageRegisterText('Register');
  });
});
