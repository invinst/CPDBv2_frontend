'use strict';

import landingPage from '../page-objects/landing-page';
import { selectText } from '../utils';


describe('Header', function () {

  beforeEach(function () {
    landingPage.open();
  });

  context('edit mode off', function () {
    it('should not display log out button', function () {
      landingPage.header.navBar.logOutButton.waitForDisplayed(2000, true);
    });
  });

  context('edit mode on', function () {
    beforeEach(function () {
      landingPage.openEditMode();
    });

    it('should display log out button and log out when we click on', function () {
      landingPage.header.navBar.logOutButton.waitForDisplayed();
      browser.getCookies(['apiAccessToken'])[0].value.should.equal('055a5575c1832e9123cd546fe0cfdc8607f8680c');
      landingPage.header.navBar.logOutButton.click();
      landingPage.loginScreen.loginModal.waitForDisplayed();
      browser.getCookies(['apiAccessToken']).should.be.empty();
    });

    describe('logo section', function () {
      beforeEach(function () {
        landingPage.header.topBar.logo.title.moveTo();
      });

      it('should display edit button when hover on logo section', function () {
        landingPage.header.topBar.logo.editButton.waitForDisplayed();
      });

      context('section edit mode on', function () {
        beforeEach(function () {
          landingPage.header.topBar.logo.editButton.click();
        });

        it('should allow editing title', function () {
          selectText(landingPage.header.topBar.logo.title.selector);
          browser.keys('abcdef');
          landingPage.header.topBar.logo.title.getText().should.containEql('abcdef');
        });

        it('should allow editing subtitle with rich text capabilities', function () {
          selectText(landingPage.header.topBar.logo.subtitle.selector);
          landingPage.richTextToolbar.element.waitForDisplayed();
        });

        it('should display save and cancel button', function () {
          landingPage.header.topBar.logo.saveButton.waitForDisplayed();
          landingPage.header.topBar.logo.cancelButton.waitForDisplayed();
        });

        it('should turn off section edit mode when click on cancel button', function () {
          landingPage.header.topBar.logo.cancelButton.click();
          landingPage.header.topBar.logo.title.moveTo();
          landingPage.header.topBar.logo.editButton.waitForDisplayed();
          landingPage.header.topBar.logo.saveButton.waitForDisplayed(2000, true);
          landingPage.header.topBar.logo.cancelButton.waitForDisplayed(2000, true);
        });
      });
    });
  });
});
