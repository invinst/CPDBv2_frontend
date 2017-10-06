'use strict';

import { includes } from 'lodash';
require('should');

import landingPage from './page-objects/landing-page';


describe.skip('Rich text editor', function () {

  beforeEach(function () {
    landingPage.open();
    landingPage.openEditMode();
    landingPage.heroSection.editToggle.click();
    landingPage.selectText(landingPage.heroSection.title.selector);
  });

  it('text should be editable', function () {
    browser.keys('abcdef');
    includes(landingPage.heroSection.title.getText(), 'abcdef').should.be.true();
  });

  describe('Toolbar', function () {
    it('should show when select text', function () {
      landingPage.richTextToolbar.element.waitForVisible();
    });

    it('should hide when click away', function () {
      browser.element('body').click();
      landingPage.richTextToolbar.element.waitForVisible(2000, true);
    });

    describe('bold button', function () {

      beforeEach(function () {
        landingPage.selectText(landingPage.heroSection.title.selector);
        landingPage.richTextToolbar.boldButton.click();
      });

      it('should make text bold when clicked', function () {
        landingPage.heroSection.boldTextSpan.waitForVisible();
      });

      it('should make text not bold when clicked on again', function () {
        landingPage.richTextToolbar.boldButton.click();
        landingPage.heroSection.boldTextSpan.waitForVisible(2000, true);
      });
    });

    describe('italic button', function () {
      beforeEach(function () {
        landingPage.selectText(landingPage.heroSection.title.selector);
        landingPage.richTextToolbar.italicButton.click();
      });

      it('should make text italic when clicked', function () {
        landingPage.heroSection.italicTextSpan.waitForVisible();
      });

      it('should make text not italic when clicked on again', function () {
        landingPage.richTextToolbar.italicButton.click();
        landingPage.heroSection.italicTextSpan.waitForVisible(2000, true);
      });
    });

    describe('link button', function () {
      beforeEach(function () {
        landingPage.selectText(landingPage.heroSection.title.selector);
        landingPage.richTextToolbar.linkButton.click();
      });

      it('should show url input when clicked on', function () {
        landingPage.richTextToolbar.urlInput.waitForVisible();
      });

      it('should hide url input when clicked on again', function () {
        landingPage.richTextToolbar.linkButton.click();
        landingPage.richTextToolbar.urlInput.waitForVisible(2000, true);
      });

      describe('url input', function () {
        it('should toggle link when url input is add/remove', function () {
          landingPage.richTextToolbar.urlInput.setValue('h');
          landingPage.heroSection.linkTextSpan.waitForVisible();

          browser.keys('Backspace');
          landingPage.heroSection.linkTextSpan.waitForVisible(2000, true);
        });

        it('should show empty input when selecting a fresh block of text', function () {
          landingPage.richTextToolbar.urlInput.getValue().should.be.empty();
        });

        it('should show existing url when selecting a link', function () {
          landingPage.richTextToolbar.urlInput.setValue('h');
          browser.element('body').click();

          landingPage.selectText(landingPage.heroSection.title.selector);
          landingPage.richTextToolbar.urlInput.getValue().should.equal('h');
        });

        it('should remove existing url of selected text when click on link button', function () {
          landingPage.richTextToolbar.urlInput.setValue('h');
          landingPage.richTextToolbar.linkButton.click();

          landingPage.heroSection.linkTextSpan.waitForVisible(2000, true);
        });

        it('should hide both toolbar and url input when click outside', function () {
          browser.element('body').click();

          landingPage.richTextToolbar.element.waitForVisible(2000, true);
        });
      });
    });
  });
});
