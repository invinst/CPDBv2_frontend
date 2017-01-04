'use strict';

require('should');

import landingPage from './page-objects/landing-page';


describe('Header', function () {

  beforeEach(function () {
    landingPage.open();
  });

  context('edit mode off', function () {
    it('should navigate to reporting path when click on reporting link', function () {
      landingPage.header.reporting.waitForVisible(1000);
      landingPage.header.reporting.click();
      landingPage.currentBasePath.should.equal('/reporting/');

      landingPage.header.closeButtonSelector.waitForVisible(1000);
      landingPage.header.closeButtonSelector.click();

      landingPage.currentBasePath.should.equal('/');
    });

    it('should navigate to FAQ path when click on FAQ link', function () {
      landingPage.header.faq.waitForVisible(1000);
      landingPage.header.faq.click();
      landingPage.currentBasePath.should.equal('/faq/');

      landingPage.header.closeButtonSelector.waitForVisible(1000);
      landingPage.header.closeButtonSelector.click();

      landingPage.currentBasePath.should.equal('/');
    });

    it('should navigate to Collaborate path when click on Collaborate link', function () {
      landingPage.header.collaborate.waitForVisible(1000);
      landingPage.header.collaborate.click();
      landingPage.currentBasePath.should.equal('/collaborate/');

      landingPage.header.closeButtonSelector.waitForVisible(1000);
      landingPage.header.closeButtonSelector.click();

      landingPage.currentBasePath.should.equal('/');
    });

    it('should navigate to base path when click on header logo', function () {
      landingPage.header.collaborate.waitForVisible(1000);
      landingPage.header.collaborate.click();
      landingPage.currentBasePath.should.equal('/collaborate/');

      landingPage.header.headerLogoSelector.waitForVisible(1000);
      landingPage.header.headerLogoSelector.click();

      landingPage.currentBasePath.should.equal('/');
    });
  });

  context('edit mode on', function () {
    beforeEach(function () {
      landingPage.openEditMode();
    });

    it('should preserve edit mode when go to reporting page', function () {
      landingPage.header.reporting.waitForVisible(1000);
      landingPage.header.reporting.click();
      landingPage.currentBasePath.should.equal('/edit/reporting/');

      landingPage.header.closeButtonSelector.waitForVisible(1000);
      landingPage.header.closeButtonSelector.click();
      landingPage.currentBasePath.should.equal('/edit/');
    });

    it('should preserve edit mode when go to faq page', function () {
      landingPage.header.faq.waitForVisible(1000);
      landingPage.header.faq.click();
      landingPage.currentBasePath.should.equal('/edit/faq/');

      landingPage.header.closeButtonSelector.waitForVisible(1000);
      landingPage.header.closeButtonSelector.click();
      landingPage.currentBasePath.should.equal('/edit/');
    });
  });
});
