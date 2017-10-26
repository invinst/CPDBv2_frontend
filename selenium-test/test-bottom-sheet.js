'use strict';

require('should');

import faqPage from './page-objects/faq-page';

describe('bottom-sheet', function () {

  describe('faq', function () {
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
