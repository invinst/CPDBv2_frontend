import Section from './section';

import { reliableSetValue } from '../../utils';


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
      resetPasswordButton: '.test--reset-password',
    });
  }

  enterCredentials(username, password) {
    this.loginModal.waitForVisible(20000);
    reliableSetValue(this.loginNameInput, username);
    reliableSetValue(this.loginPasswordInput, password);
  }

  login() {
    this.enterCredentials('username', 'password');
    this.loginButton.click();
    this.loginModal.waitForExist(40000, true);
  }
}

module.exports = LoginScreen;
