'use strict';

require('should');

import landingPage from './page-objects/landing-page';
import reportingPage from './page-objects/reporting-page';
import faqPage from './page-objects/faq-page';


describe('bottom-sheet', function () {

  describe('report', function () {
    it('should open and close report bottom-sheet', function () {
      landingPage.open();

      // click on story-medium should open bottom-sheet and body element should has noscroll class
      landingPage.reportingSection.report.waitForVisible();
      landingPage.reportingSection.report.click();
      landingPage.bottomSheet.reportBottomSheet.waitForVisible();
      landingPage.bottomSheet.overlay.waitForVisible();
      browser.element('body').getAttribute('class').should.containEql('noscroll');
      landingPage.currentBasePath.should.equal('/reporting/1/');

      // click on dismiss should close bottom-sheet and body element shouldn't has noscroll class
      landingPage.bottomSheet.clickOverlay();
      landingPage.bottomSheet.reportBottomSheet.waitForVisible(10000, true);
      landingPage.bottomSheet.overlay.waitForVisible(10000, true);
      browser.element('body').getAttribute('class').should.not.containEql('noscroll');
      landingPage.currentBasePath.should.equal('/');
    });

    it('should show report bottom sheet when visit /reporting/<id>/ path', function () {
      browser.url('/reporting/1/');
      reportingPage.bottomSheet.reportBottomSheet.waitForVisible();
      reportingPage.bottomSheet.clickOverlay();
      reportingPage.bottomSheet.reportBottomSheet.waitForVisible(10000, true);
      reportingPage.currentBasePath.should.equal('/reporting/');
    });

    it('should show publication, publish date, author, excerpt and more link', function () {
      browser.url('/reporting/1/');

      reportingPage.bottomSheet.reportPublicationLabel.waitForVisible();
      reportingPage.bottomSheet.reportPublishDateLabel.waitForVisible();
      reportingPage.bottomSheet.reportAuthorLabel.waitForVisible();
    });

    it('should show report bottom sheet in edit mode when visit /edit/reporting/<id>/ path', function () {
      reportingPage.openEditMode();
      browser.url('/edit/reporting/1/');

      reportingPage.bottomSheet.reportBottomSheet.waitForVisible();
      reportingPage.bottomSheet.clickOverlay();
      reportingPage.bottomSheet.reportBottomSheet.waitForVisible(10000, true);
      reportingPage.currentBasePath.should.equal('/edit/reporting/');
    });
  });

  describe('faq', function () {
    it('should open and close faq bottom-sheet', function () {
      landingPage.open();

      landingPage.faqSection.faq.waitForVisible();
      landingPage.faqSection.faq.click();
      landingPage.bottomSheet.faqBottomSheet.waitForVisible();
      landingPage.bottomSheet.overlay.waitForVisible();
      browser.element('body').getAttribute('class').should.containEql('noscroll');
      landingPage.currentBasePath.should.equal('/faq/9/');

      landingPage.bottomSheet.clickOverlay();
      landingPage.bottomSheet.faqBottomSheet.waitForVisible(10000, true);
      landingPage.bottomSheet.overlay.waitForVisible(10000, true);
      browser.element('body').getAttribute('class').should.not.containEql('noscroll');
      landingPage.currentBasePath.should.equal('/');
    });

    it('should show faq bottom sheet when visit /faq/<id>/ path', function () {
      browser.url('/faq/1/');
      faqPage.bottomSheet.faqBottomSheet.waitForVisible();
      faqPage.bottomSheet.clickOverlay();
      faqPage.bottomSheet.faqBottomSheet.waitForVisible(10000, true);
      faqPage.currentBasePath.should.equal('/faq/');
    });

    it('should show question and answer', function () {
      browser.url('/faq/1/');

      faqPage.bottomSheet.faqQuestion.waitForVisible();
      faqPage.bottomSheet.faqAnswer.waitForVisible();
    });

    it('should show faq bottom sheet in edit mode when visit /edit/faq/<id>/ path', function () {
      faqPage.openEditMode();
      browser.url('/edit/faq/1/');

      faqPage.bottomSheet.faqBottomSheet.waitForVisible();
      faqPage.bottomSheet.clickOverlay();
      faqPage.bottomSheet.faqBottomSheet.waitForVisible(10000, true);
      faqPage.currentBasePath.should.equal('/edit/faq/');
    });
  });
});
