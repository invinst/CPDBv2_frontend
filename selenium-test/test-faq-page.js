'use strict';

require('should');

import faqPage from './page-objects/faq-page';


describe('FAQ page', function () {

  beforeEach(function () {
    faqPage.open();
  });

  context('edit mode off', function () {
    it('should have URI "/faq/"', function () {
      faqPage.currentBasePath.should.equal('/faq/');
    });

    it('should show list of questions', function () {
      faqPage.faqSection.faq.count.should.equal(3);
    });

    it('should display answer when click on question', function () {
      faqPage.faqSection.faq.click();
      faqPage.faqSection.faqContent.waitForVisible(2000);
    });

    it('should not have starred checkbox', function () {
      faqPage.faqSection.starredCheckbox.waitForVisible(2000, true);
    });
  });

  context('edit mode on', function () {
    beforeEach(function () {
      faqPage.openEditMode();
    });

    it('should have URI "/edit/faq/"', function () {
      faqPage.currentBasePath.should.equal('/edit/faq/');
    });

    it('should show add button', function () {
      faqPage.faqSection.addButton.waitForVisible();
    });

    it('should open empty edittable bottom sheet when click on add button', function () {
      faqPage.faqSection.addButton.click();

      faqPage.bottomSheet.faq.element.waitForVisible();
      faqPage.isRichTextEditorEmpty(faqPage.bottomSheet.faq.question).should.be.true();
      faqPage.isRichTextEditorEmpty(faqPage.bottomSheet.faq.answer).should.be.true();
    });

    it('should open edittable bottom sheet when click on question', function () {
      faqPage.faqSection.faq.click();
      faqPage.bottomSheet.faq.element.waitForVisible();
      faqPage.isRichTextEditorEmpty(faqPage.bottomSheet.faq.question).should.be.false();
      faqPage.isRichTextEditorEmpty(faqPage.bottomSheet.faq.answer).should.be.false();
    });

    it('should toggle starred when click on starred checkbox', function () {
      faqPage.faqSection.checkedStarredCheckbox.waitForVisible(2000, true);
      faqPage.faqSection.starredCheckbox.click();
      faqPage.faqSection.checkedStarredCheckbox.waitForVisible();
    });
  });
});
