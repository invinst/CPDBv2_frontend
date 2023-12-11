'use strict';

require('should');

import landingPage from '../page-objects/landing-page';
import api from '../mock-api';
import { mockCommonApi } from '../mock-data/utils';


describe('Login screen', function () {
  beforeEach(function () {
    mockCommonApi();
    landingPage.open();
    landingPage.toggleEditMode(false);
  });

  describe('login button', function () {
    it('should do nothing when clicked on if username and password are not filled in', function () {
      landingPage.loginScreen.loginButton.waitForDisplayed();
      landingPage.loginScreen.loginButton.click();
      landingPage.loginScreen.loginModal.waitForDisplayed();
    });

    it('should hide login screen when clicked on if logged-in successfully', function () {
      api
        .onPost('/api/v2/users/sign-in/', { username: 'username', password: 'password' })
        .reply(200, { 'apiAccessToken': '055a5575c1832e9123cd546fe0cfdc8607f8680c' });

      landingPage.loginScreen.loginModal.waitForDisplayed();
      landingPage.loginScreen.enterCredentials('username', 'password');
      landingPage.loginScreen.loginButton.click();
      landingPage.loginScreen.loginModal.waitForExist(2000, true);
    });

    it('should show error message when clicked on if there is an error', function () {
      api
        .onPost('/api/v2/users/sign-in/', { username: 'badname', password: 'badpassword' })
        .reply(400, { 'message': 'Bad username/password' });

      landingPage.loginScreen.loginModal.waitForDisplayed();
      landingPage.loginScreen.enterCredentials('badname', 'badpassword');
      landingPage.loginScreen.loginButton.click();

      landingPage.loginScreen.loginModal.waitForDisplayed();
      browser.waitUntil(function () {
        return landingPage.loginScreen.loginModal.getText().indexOf('Bad username/password') !== -1;
      }, 2000, 'expected error text to show after 2s');
    });
  });

  describe('reset password link', function () {
    it('should show reset password modal when clicked on', function () {
      landingPage.loginScreen.forgotPasswordButton.waitForDisplayed();
      landingPage.loginScreen.forgotPasswordButton.click();
      landingPage.loginScreen.forgotPasswordModal.waitForDisplayed();
    });
  });

  describe('reset password modal', function () {
    beforeEach(function () {
      landingPage.loginScreen.forgotPasswordButton.waitForDisplayed();
      landingPage.loginScreen.forgotPasswordButton.click();
      landingPage.loginScreen.forgotPasswordModal.waitForDisplayed();
    });

    describe('reset password button', function () {
      it('should show success message when clicked on if there is not an error', function () {
        api
          .onPost('/api/v2/users/forgot-password/', { email: 'valid@email.com' })
          .reply(200, { 'message': 'Please check your email for a password reset link.' });

        landingPage.loginScreen.emailInput.waitForDisplayed();
        landingPage.loginScreen.emailInput.setValue('valid@email.com');
        landingPage.loginScreen.resetPasswordButton.click();

        landingPage.loginScreen.forgotPasswordModal.waitForExist(2000, true);

        browser.waitUntil(function () {
          return landingPage.loginScreen.loginModal.getText()
            .indexOf('Please check your email for a password reset link.') !== -1;
        }, 2000, 'expected success text to show after 2s');
      });

      it('should show error message when clicked on if there is an error', function () {
        api
          .onPost('/api/v2/users/forgot-password/', { email: 'invalid@email.com' })
          .reply(400, { 'message': 'Sorry, there\'s no account registered with this email address.' });

        landingPage.loginScreen.emailInput.setValue('invalid@email.com');
        landingPage.loginScreen.resetPasswordButton.click();

        browser.waitUntil(function () {
          return landingPage.loginScreen.forgotPasswordModal.getText()
            .indexOf('Sorry, there\'s no account registered with this email address.') !== -1;
        }, 2000, 'expected error text to show after 2s');
      });
    });
  });
});
