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

      const text = landingPage.loginScreen.loginModal.getText();
      text.should.containEql('Bad username/password');
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
        landingPage.loginScreen.emailInput.setValue('valid@email.com');
        landingPage.loginScreen.resetPasswordButton.click();

        landingPage.loginScreen.forgotPasswordModal.waitForVisible(2000, true);

        const text = landingPage.loginScreen.loginModal.getText();
        text.should.containEql('Please check your email for a password reset link.');
      });

      it('should show error message when clicked on if there is an error', function () {
        landingPage.loginScreen.emailInput.setValue('invalid@email.com');
        landingPage.loginScreen.resetPasswordButton.click();

        const text = landingPage.loginScreen.forgotPasswordModal.getText();
        text.should.containEql('Sorry, there\'s no account registered with this email address.');
      });
    });
  });
});
