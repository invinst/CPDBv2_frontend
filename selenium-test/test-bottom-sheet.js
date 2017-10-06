'use strict';

require('should');

import faqPage from './page-objects/faq-page';
import searchPage from './page-objects/search-page';


function clickOverlay() {
  browser.moveToObject('body', 10, 10);
  browser.buttonPress();
}

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

  describe('officer', function () {
    it('should open officer bottom-sheet when visit /officer/<id>/ directly', function () {
      browser.url('/officer/1/');

      searchPage.officerBottomSheet.element.waitForVisible();
    });

    it('should display search page when we visit officer directly, then click overlay', function () {
      browser.url('/officer/1/');

      clickOverlay();
      browser.getUrl().should.match(/\/search\/$/);
    });

    it('should display search page when we visit officer and click overlay;' +
      'then should display officer page when hit on back botton;' +
      'then should display search page again when we click overlay', function () {
      browser.url('/officer/1/');

      clickOverlay();
      browser.getUrl().should.match(/\/search\/$/);

      browser.back();
      browser.getUrl().should.match(/\/officer\/1\/$/);

      clickOverlay();
      browser.getUrl().should.match(/\/search\/$/);
    });
  });
});
