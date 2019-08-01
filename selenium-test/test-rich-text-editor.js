'use strict';

import 'should';

import landingPage from './page-objects/landing-page';
import { selectText } from './utils';


describe('Rich text editor', function () {
  beforeEach(function () {
    landingPage.open();
    landingPage.openEditMode();
    browser.moveToObject(landingPage.topHeader.topBar.logo.subtitle.selector);
    landingPage.topHeader.topBar.logo.editButton.waitForVisible();
    landingPage.topHeader.topBar.logo.editButton.click();
    selectText(landingPage.topHeader.topBar.logo.subtitle.selector);
  });

  it('text should be editable', function () {
    browser.keys('abcdef');
    landingPage.topHeader.topBar.logo.subtitle.getText().should.containEql('abcdef');
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
        landingPage.richTextToolbar.boldButton.waitForVisible();
        landingPage.richTextToolbar.boldButton.click();
      });

      it('should make text bold when clicked', function () {
        landingPage.topHeader.topBar.logo.boldTextSpan.waitForVisible();
      });

      it('should make text not bold when clicked on again', function () {
        // There is a rare case when the text barely fills one line that when it is bold, it becomes 2 lines. And
        // sometime when this happens, the whole Toolbar disappears. This should be fixed in the future. For now, we
        // just reselect the text to make the toolbar appear again.
        selectText(landingPage.topHeader.topBar.logo.subtitle.selector);
        landingPage.richTextToolbar.boldButton.waitForVisible();
        landingPage.richTextToolbar.boldButton.click();
        landingPage.topHeader.topBar.logo.boldTextSpan.waitForVisible(2000, true);
      });
    });

    describe('italic button', function () {
      beforeEach(function () {
        landingPage.richTextToolbar.italicButton.waitForVisible();
        landingPage.richTextToolbar.italicButton.click();
      });

      it('should make text italic when clicked', function () {
        landingPage.topHeader.topBar.logo.italicTextSpan.waitForVisible();
      });

      it('should make text not italic when clicked on again', function () {
        landingPage.richTextToolbar.italicButton.click();
        landingPage.topHeader.topBar.logo.italicTextSpan.waitForVisible(2000, true);
      });
    });

    describe('link button', function () {
      beforeEach(function () {
        landingPage.expandRootTopMargin(); //preventing the urlInput from hiding away
        selectText(landingPage.topHeader.topBar.logo.subtitleFirstLine.selector);
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
          landingPage.topHeader.topBar.logo.linkTextSpan.waitForVisible();

          browser.keys('Backspace');
          landingPage.topHeader.topBar.logo.linkTextSpan.waitForVisible(2000, true);
        });

        it('should show empty input when selecting a fresh block of text', function () {
          landingPage.richTextToolbar.urlInput.getValue().should.be.empty();
        });

        it('should show existing url when selecting a link', function () {
          landingPage.richTextToolbar.urlInput.setValue('h');
          landingPage.topHeader.topBar.logo.subtitle.click();

          selectText(landingPage.topHeader.topBar.logo.subtitleFirstLine.selector);
          landingPage.richTextToolbar.urlInput.getValue().should.equal('h');
        });

        it('should remove existing url of selected text when click on link button', function () {
          landingPage.richTextToolbar.urlInput.setValue('h');
          landingPage.richTextToolbar.linkButton.click();

          landingPage.topHeader.topBar.logo.linkTextSpan.waitForVisible(2000, true);
        });

        it('should hide both toolbar and url input when click outside', function () {
          browser.element('body').click();

          landingPage.richTextToolbar.element.waitForVisible(2000, true);
        });
      });
    });
  });
});
