'use strict';

var should = require('should');

import landingPage from './page-objects/landing-page';


describe('Header', function () {

  beforeEach(function () {
    landingPage.open();
  });

  context('edit mode off', function () {
    it('should navigate to FAQ path when click on FAQ link', function () {
      landingPage.topHeader.faq.waitForVisible();
      landingPage.topHeader.faq.click();
      browser.pause(500);
      landingPage.currentBasePath.should.equal('/faq/');
    });

    it.skip('should navigate to Collaborate path when click on Collaborate link', function () {
      landingPage.topHeader.collaborate.waitForVisible();
      landingPage.topHeader.collaborate.click();
      browser.pause(500);
      landingPage.currentBasePath.should.equal('/collaborate/');
    });

    it('should navigate to base path when click on header logo', function () {
      landingPage.topHeader.faq.waitForVisible();
      landingPage.topHeader.faq.click();
      browser.pause(500);

      landingPage.topHeader.headerLogoSelector.waitForVisible();
      landingPage.topHeader.headerLogoSelector.click();

      landingPage.currentBasePath.should.equal('/');
    });

    it('should not display log out button', function () {
      landingPage.topHeader.logOutButton.waitForVisible(2000, true);
    });
  });

  context('edit mode on', function () {
    beforeEach(function () {
      landingPage.openEditMode();
    });

    it('should preserve edit mode when go to faq page', function () {
      landingPage.topHeader.faq.waitForVisible();
      landingPage.topHeader.faq.click();
      browser.pause(500);
      landingPage.currentBasePath.should.equal('/edit/faq/');

      landingPage.topHeader.headerLogoSelector.waitForVisible();
      landingPage.topHeader.headerLogoSelector.click();
      landingPage.currentBasePath.should.equal('/edit/');
    });

    it('should display log out button and log out when we click on', function () {
      landingPage.topHeader.logOutButton.waitForVisible();
      landingPage.topHeader.logOutButton.click();
      landingPage.loginScreen.loginModal.waitForVisible();
      should(browser.getCookie('apiAccessToken')).be.null();
    });
  });
});
