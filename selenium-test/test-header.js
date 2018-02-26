'use strict';

import { includes } from 'lodash';

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

    it('should navigate to base path when click on header logo', function () {
      landingPage.topHeader.faq.waitForVisible();
      landingPage.topHeader.faq.click();
      browser.pause(500);

      landingPage.topHeader.logo.title.waitForVisible();
      landingPage.topHeader.logo.title.click();

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

      landingPage.topHeader.logo.title.waitForVisible();
      landingPage.topHeader.logo.title.click();
      landingPage.currentBasePath.should.equal('/edit/');
    });

    it('should display log out button and log out when we click on', function () {
      landingPage.topHeader.logOutButton.waitForVisible();
      landingPage.topHeader.logOutButton.click();
      landingPage.loginScreen.loginModal.waitForVisible();
      should(browser.getCookie('apiAccessToken')).be.null();
    });

    describe('logo section', function () {
      beforeEach(function () {
        browser.moveToObject(landingPage.topHeader.logo.title.selector);
      });

      it('should display edit button when hover on logo section', function () {
        landingPage.topHeader.logo.editButton.waitForVisible();
      });

      context('section edit mode on', function () {
        beforeEach(function () {
          landingPage.topHeader.logo.editButton.click();
        });

        it('should allow editting title', function () {
          landingPage.selectText(landingPage.topHeader.logo.title.selector);
          browser.keys('abcdef');
          includes(landingPage.topHeader.logo.title.getText(), 'abcdef').should.be.true();
        });

        it('should allow editting subtitle with rich text capabilities', function () {
          landingPage.selectText(landingPage.topHeader.logo.subtitle.selector);
          landingPage.richTextToolbar.element.waitForVisible();
        });

        it('should display save and cancel button', function () {
          landingPage.topHeader.logo.saveButton.waitForVisible();
          landingPage.topHeader.logo.cancelButton.waitForVisible();
        });

        it('should turn off section edit mode when click on cancel button', function () {
          landingPage.topHeader.logo.cancelButton.click();
          landingPage.topHeader.logo.editButton.waitForVisible();
          landingPage.topHeader.logo.saveButton.waitForVisible(2000, true);
          landingPage.topHeader.logo.cancelButton.waitForVisible(2000, true);
        });
      });
    });
  });
});
