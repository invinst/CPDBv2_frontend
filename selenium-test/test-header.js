'use strict';

var should = require('should');

import landingPage from './page-objects/landing-page';


describe('Header', function () {

  beforeEach(function () {
    landingPage.open();
  });

  context('edit mode off', function () {
    it('should navigate to FAQ path when click on FAQ link', function () {
      landingPage.header.faq.waitForVisible();
      landingPage.header.faq.click();
      browser.pause(500);
      landingPage.currentBasePath.should.equal('/faq/');
    });

    it('should navigate to Collaborate path when click on Collaborate link', function () {
      landingPage.header.collaborate.waitForVisible();
      landingPage.header.collaborate.click();
      browser.pause(500);
      landingPage.currentBasePath.should.equal('/collaborate/');
    });

    it('should navigate to base path when click on header logo', function () {
      landingPage.header.collaborate.waitForVisible();
      landingPage.header.collaborate.click();
      browser.pause(500);

      landingPage.header.headerLogoSelector.waitForVisible();
      landingPage.header.headerLogoSelector.click();

      landingPage.currentBasePath.should.equal('/');
    });

    it('should not display log out button', function () {
      landingPage.header.logOutButton.waitForVisible(2000, true);
    });
  });

  context('edit mode on', function () {
    beforeEach(function () {
      landingPage.openEditMode();
    });

    it('should preserve edit mode when go to faq page', function () {
      landingPage.header.faq.waitForVisible();
      landingPage.header.faq.click();
      browser.pause(500);
      landingPage.currentBasePath.should.equal('/edit/faq/');

      landingPage.header.headerLogoSelector.waitForVisible();
      landingPage.header.headerLogoSelector.click();
      landingPage.currentBasePath.should.equal('/edit/');
    });

    it('should display log out button and log out when we click on', function () {
      landingPage.header.logOutButton.waitForVisible();
      landingPage.header.logOutButton.click();
      landingPage.loginScreen.loginModal.waitForVisible();
      should(browser.getCookie('apiAccessToken')).be.null();
    });
  });
});
