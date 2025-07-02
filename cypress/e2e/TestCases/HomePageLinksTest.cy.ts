import HomePage from '../PageObjects/HomePage';
import Utilities from '../Utils/utilities';

const homePage = new HomePage();
const utilities = new Utilities();

describe('Ten10 Interest calculator home page link responses', () => {
  beforeEach(() => {
    cy.log('Landing on home page before each test');
    cy.visit(Cypress.env('baseurl'));
  });

  it('Should land on Ten10TechTest page when clicked on `Ten10TechTest`', () => {
    cy.log('Clicking on Ten10TechTest link');
    cy.get('a.navbar-brand.text-white', { timeout: 6000 }).click({ force: true });
    utilities.assertLandingPageUrl('/');
    cy.get('h1').should('have.text', 'Welcome to Ten10 Technical Test Website');
  });

  it('Should land on Home page when clicked on `Home`', () => {
    homePage.clickLinkAndAssert('Home', '/', 'Welcome to Ten10 Technical Test Website');
  });

  it('Should land on privacy link page when clicked on `Privacy`', () => {
    homePage.clickOnPrivacyPolicyLink();
    utilities.assertLandingPageUrl('/Home/Privacy');
    cy.get('h1').should('have.text', 'Privacy Policy');
  });

  it('Should land on Registration page when clicked on `Register`', () => {
    homePage.clickLinkAndAssert('Register', '/Identity/Account/Register', 'Register');
  });

  it('Should land on Login page when clicked on `Login`', () => {
    homePage.clickLinkAndAssert(
      'Login',
      '/?area=Views&page=%2FAccount%2FLogin',
      'Welcome to Ten10 Technical Test Website'
    );
  });
});

describe('Responsive - Ten10TechTest app', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseurl'));
  });

  it('Should display homepage correctly on iPhone X viewport', () => {
    cy.viewport('iphone-x');

    cy.get('h1').should('be.visible').and('have.text', 'Welcome to Ten10 Technical Test Website');
    cy.get(`button[type="button"]`).contains('Register').should('be.visible');
  });

  it('Should display homepage correctly on iPad viewport', () => {
    cy.viewport(820, 1180); // You can also use 'ipad-2' or 'ipad-mini'

    cy.get('h1').should('be.visible').and('have.text', 'Welcome to Ten10 Technical Test Website');
    cy.get(`button[type="button"]`).contains('Register').should('be.visible');
  });
});
