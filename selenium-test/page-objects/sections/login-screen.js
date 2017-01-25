import Section from './section';


class LoginScreen extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      loginModal: '.test--login-modal',
      loginNameInput: '.test--login-modal .name-input-wrapper input',
      loginPasswordInput: '.test--login-modal .password-input-wrapper input',
      loginButton: '.test--login-modal .test--login-button',
      forgotPasswordButton: '.test--forgot-password-link',
      forgotPasswordModal: '.test--forgot-password-modal',
      emailInput: '.test--login-modal .email-input-wrapper input',
      resetPasswordButton: '.test--reset-password'
    });
  }

  enterCredentials(username, password) {
    this.loginModal.waitForVisible(20000);
    this.loginNameInput.setValue(username);
    this.loginPasswordInput.setValue(password);
  }

  login() {
    this.enterCredentials('username', 'password');
    this.loginButton.click();
    this.loginModal.waitForVisible(20000, true);
  }
}

module.exports = LoginScreen;
