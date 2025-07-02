class Selectors {
  loginPageSelectors = {
    titleLogo: 'a.navbar-brand.text-white',
    usernameInput: '#UserName',
    passwordInput: '#Password',
    rememberMeCheckbox: 'input[type="checkbox"]',
    submitButton: '#login-submit',
    welcomeText: 'a[title="Manage"]',
    invalidErrorMessage: '.text-danger.validation-summary-errors li',
    logoutButton: '#logout-container button',
  };

  /*
  interestCalculatorPage = {
  // other selectors...

  interestRateCheckbox: (ratePercent: number) => `[aria-labelledby="dropdownMenuButton"] input[id="rate-${ratePercent}%"]`,
};
  
  */

  interestCalculatorPage = {
    principalAmountSlider: 'input#customRange1',
    interestRateDropdownButton: 'button#dropdownMenuButton',
    interestRateCheckbox: (ratePercent: number) =>
      `[aria-labelledby="dropdownMenuButton"] input[id="rate-${ratePercent}%"]`,
    durationOption: (duration: string) => `#durationList a[data-value="${duration}"]`,
    mandatoryConsentCheckbox: 'input#gridCheck1[type="checkbox"]',
    calculateButton: 'button.btn.btn-primary[type="button"]',
    interestAmountText: '#interestAmount',
    totalAmountText: 'h2#totalAmount',
  };

  registrationPageSelectors = {
    registerButtonOnHome: 'button[type="button"]:contains("Register")',
    pageHeader: 'h1',
    usernameInput: 'input[autocomplete="username"]',
    passwordInput: 'input[id="Input_Password"]',
    confirmPasswordInput: 'input[id="Input_ConfirmPassword"]',
    registerSubmitButton: 'button[id="registerSubmit"]',
    registerConfirmationHeader: 'h1',
    confirmEmailLink: '#confirm-link',
    alertDismissButton: 'button[data-bs-dismiss="alert"]',
  };
}

export default Selectors;
