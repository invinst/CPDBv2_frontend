'use strict';

import 'should';
import { includes } from 'lodash';

import faqPage from './page-objects/faq-page';


describe('Rich text editor', function () {

  beforeEach(function () {
    faqPage.openItemEditMode();
    faqPage.selectText(faqPage.bottomSheet.faq.answer.selector);
  });

  it('text should be editable', function () {
    browser.keys('abcdef');
    includes(faqPage.bottomSheet.faq.answer.getText(), 'abcdef').should.be.true();
  });

  describe('Toolbar', function () {
    it('should show when select text', function () {
      faqPage.richTextToolbar.element.waitForVisible();
    });

    it('should hide when click away', function () {
      browser.element('body').click();
      faqPage.richTextToolbar.element.waitForVisible(2000, true);
    });

    describe('bold button', function () {
      beforeEach(function () {
        faqPage.richTextToolbar.boldButton.waitForVisible();
        faqPage.richTextToolbar.boldButton.click();
      });

      it('should make text bold when clicked', function () {
        this.retries(3);

        faqPage.bottomSheet.faq.boldTextSpan.waitForVisible();
      });

      it('should make text not bold when clicked on again', function () {
        this.retries(3);

        faqPage.richTextToolbar.boldButton.click();
        faqPage.bottomSheet.faq.boldTextSpan.waitForVisible(2000, true);
      });
    });

    describe('italic button', function () {
      beforeEach(function () {
        faqPage.richTextToolbar.italicButton.waitForVisible();
        faqPage.richTextToolbar.italicButton.click();
      });

      it('should make text italic when clicked', function () {
        this.retries(3);

        faqPage.bottomSheet.faq.italicTextSpan.waitForVisible();
      });

      it('should make text not italic when clicked on again', function () {
        this.retries(3);

        faqPage.richTextToolbar.italicButton.click();
        faqPage.bottomSheet.faq.italicTextSpan.waitForVisible(2000, true);
      });
    });

    describe('link button', function () {
      beforeEach(function () {
        faqPage.richTextToolbar.linkButton.click();
      });

      it('should show url input when clicked on', function () {
        faqPage.richTextToolbar.urlInput.waitForVisible();
      });

      it('should hide url input when clicked on again', function () {
        faqPage.richTextToolbar.linkButton.click();
        faqPage.richTextToolbar.urlInput.waitForVisible(2000, true);
      });

      describe('url input', function () {
        it('should toggle link when url input is add/remove', function () {
          faqPage.richTextToolbar.urlInput.setValue('h');
          faqPage.bottomSheet.faq.linkTextSpan.waitForVisible();

          browser.keys('Backspace');
          faqPage.bottomSheet.faq.linkTextSpan.waitForVisible(2000, true);
        });

        it('should show empty input when selecting a fresh block of text', function () {
          faqPage.richTextToolbar.urlInput.getValue().should.be.empty();
        });

        it('should show existing url when selecting a link', function () {
          faqPage.richTextToolbar.urlInput.setValue('h');
          browser.element('body').click();

          faqPage.selectText(faqPage.bottomSheet.faq.answer.selector);
          faqPage.richTextToolbar.urlInput.getValue().should.equal('h');
        });

        it('should remove existing url of selected text when click on link button', function () {
          faqPage.richTextToolbar.urlInput.setValue('h');
          faqPage.richTextToolbar.linkButton.click();

          faqPage.bottomSheet.faq.linkTextSpan.waitForVisible(2000, true);
        });

        it('should hide both toolbar and url input when click outside', function () {
          browser.element('body').click();

          faqPage.richTextToolbar.element.waitForVisible(2000, true);
        });
      });
    });
  });
});
