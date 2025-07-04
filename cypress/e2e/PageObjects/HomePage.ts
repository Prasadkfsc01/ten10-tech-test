import Selectors from '../../support/Selectors';
const selectors = new Selectors();

class HomePage {
  // Click a top navbar link by visible text and assert expected URL and heading
  clickLinkAndAssert(linkText: string, expectedUrlPath: string, expectedHeaderText: string) {
    cy.get(selectors.homePageSelectors.navbarLink, { timeout: 6000 })
      .contains(linkText)
      .click({ force: true });

    cy.url().should('include', expectedUrlPath);
    cy.get(selectors.homePageSelectors.pageHeader).should('have.text', expectedHeaderText);
  }

  // Click on Privacy Policy specifically
  clickOnPrivacyPolicyLink() {
    cy.get(selectors.homePageSelectors.navbarLink).contains('Privacy').click({ force: true });
  }

  // (Optional) If you have a common way to get page headers
  assertHeaderText(expectedText: string) {
    cy.get(selectors.homePageSelectors.pageHeader).should('have.text', expectedText);
  }

  clickOnTen10HomePageLink() {
    cy.get(selectors.homePageSelectors.navbarBrand, { timeout: 6000 }).click({ force: true });
  }

  assertTen10HomePageLanding() {
    cy.url().should('include', '/');
    this.assertHeaderText('Welcome to Ten10 Technical Test Website');
  }

  assertLandingPageRegisterText(expectedText: string) {
    cy.get(selectors.homePageSelectors.registerButton).contains(expectedText).should('be.visible');
  }
}

export default HomePage;
