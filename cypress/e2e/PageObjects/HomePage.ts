class HomePage {
  // Click a navbar link by its visible text and assert URL path and page header
  clickLinkAndAssert(linkText: string, expectedUrlPath: string, expectedHeaderText: string) {
    cy.get('a.nav-link.text-white', { timeout: 6000 }).contains(linkText).click({ force: true });
    cy.url().should('include', expectedUrlPath);
    cy.get('h1').should('have.text', expectedHeaderText);
  }

  clickOnPrivacyPolicyLink() {
    cy.get('a.nav-link.text-white').contains('Privacy').click({ force: true });
  }
}

export default HomePage;
