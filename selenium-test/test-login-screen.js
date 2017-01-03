'use strict';

require('should');

import landingPage from './page-objects/landing-page';


describe('Login screen', function () {
  beforeEach(function () {
    landingPage.open();
    landingPage.enterEditMode();
  });

  describe('login button', function () {
    it('should do nothing when clicked on if username and password are not filled in', function () {
      landingPage.loginScreen.loginButton.click();
      browser.pause(2000);
      landingPage.loginScreen.loginModal.waitForVisible();
    });

    it('should hide login screen when clicked on if logged-in successfully', function () {
      landingPage.loginScreen.enterCredentials('username', 'password');
      landingPage.loginScreen.loginButton.click();
      landingPage.loginScreen.loginModal.waitForExist(2000, true);
    });

    it('should show error message when clicked on if there is an error', function () {
      landingPage.loginScreen.enterCredentials('badname', 'badpassword');
      landingPage.loginScreen.loginButton.click();

      landingPage.loginScreen.loginModal.waitForVisible();
      browser.waitUntil(function () {
        return landingPage.loginScreen.loginModal.getText().indexOf('Bad username/password') !== -1;
      }, 2000, 'expected error text to show after 2s');
    });
  });

  describe('reset password link', function () {
    it('should show reset password modal when clicked on', function () {
      landingPage.loginScreen.forgotPasswordButton.click();
      landingPage.loginScreen.forgotPasswordModal.waitForVisible(2000);
    });
  });

  describe('reset password modal', function () {
    beforeEach(function () {
      landingPage.loginScreen.forgotPasswordButton.click();
      landingPage.loginScreen.forgotPasswordModal.waitForVisible(2000);
    });

    describe('reset password button', function () {
      it('should show success message when clicked on if there is not an error', function () {
        landingPage.loginScreen.emailInput.waitForVisible();
        landingPage.loginScreen.emailInput.setValue('valid@email.com');
        landingPage.loginScreen.resetPasswordButton.click();

        landingPage.loginScreen.forgotPasswordModal.waitForExist(2000, true);

        browser.waitUntil(function () {
          return landingPage.loginScreen.loginModal.getText()
            .indexOf('Please check your email for a password reset link.') !== -1;
        }, 2000, 'expected success text to show after 2s');
      });

      it('should show error message when clicked on if there is an error', function () {
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
