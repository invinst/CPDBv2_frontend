'use strict';

import 'should';

import landingPage from '../page-objects/landing-page';
import { selectText } from '../utils';
import { landingPageCmsData } from '../mock-data/landing-page/common';
import api from '../mock-api';


describe('Rich text editor', function () {
  beforeEach(function () {
    api.onGet('/api/v2/cms-pages/landing-page/').reply(200, landingPageCmsData);
    api
      .onPost('/api/v2/users/sign-in/', { username: 'username', password: 'password' })
      .reply(200, { 'apiAccessToken': '055a5575c1832e9123cd546fe0cfdc8607f8680c' });
    landingPage.open();
    landingPage.openEditMode();
    landingPage.header.topBar.logo.subtitle.moveTo();
    landingPage.header.topBar.logo.editButton.waitForDisplayed();
    landingPage.header.topBar.logo.editButton.click();
    selectText(landingPage.header.topBar.logo.subtitle.selector);
  });

  it('text should be editable', function () {
    browser.keys('abcdef');
    landingPage.header.topBar.logo.subtitle.getText().should.containEql('abcdef');
  });

  describe('Toolbar', function () {
    it('should show when select text', function () {
      landingPage.richTextToolbar.element.waitForDisplayed();
    });

    it('should hide when click away', function () {
      $('body').click();
      landingPage.richTextToolbar.element.waitForDisplayed(2000, true);
    });

    describe('bold button', function () {
      beforeEach(function () {
        landingPage.richTextToolbar.boldButton.waitForDisplayed();
        landingPage.richTextToolbar.boldButton.click();
      });

      it('should make text bold when clicked', function () {
        landingPage.header.topBar.logo.boldTextSpan.waitForDisplayed();
      });

      it('should make text not bold when clicked on again', function () {
        // There is a rare case when the text barely fills one line that when it is bold, it becomes 2 lines. And
        // sometime when this happens, the whole Toolbar disappears. This should be fixed in the future. For now, we
        // just reselect the text to make the toolbar appear again.
        selectText(landingPage.header.topBar.logo.subtitle.selector);
        landingPage.richTextToolbar.boldButton.waitForDisplayed();
        landingPage.richTextToolbar.boldButton.click();
        landingPage.header.topBar.logo.boldTextSpan.waitForDisplayed(2000, true);
      });
    });

    describe('italic button', function () {
      beforeEach(function () {
        landingPage.richTextToolbar.italicButton.waitForDisplayed();
        landingPage.richTextToolbar.italicButton.click();
      });

      it('should make text italic when clicked', function () {
        landingPage.header.topBar.logo.italicTextSpan.waitForDisplayed();
      });

      it('should make text not italic when clicked on again', function () {
        landingPage.richTextToolbar.italicButton.click();
        landingPage.header.topBar.logo.italicTextSpan.waitForDisplayed(2000, true);
      });
    });

    describe('link button', function () {
      beforeEach(function () {
        landingPage.expandRootTopMargin(); //preventing the urlInput from hiding away
        selectText(landingPage.header.topBar.logo.subtitleFirstLine.selector);
        landingPage.richTextToolbar.linkButton.click();
      });

      it('should show url input when clicked on', function () {
        landingPage.richTextToolbar.urlInput.waitForDisplayed();
      });

      it('should hide url input when clicked on again', function () {
        landingPage.richTextToolbar.linkButton.click();
        landingPage.richTextToolbar.urlInput.waitForDisplayed(2000, true);
      });

      describe('url input', function () {
        it('should toggle link when url input is add/remove', function () {
          landingPage.richTextToolbar.urlInput.setValue('h');
          landingPage.header.topBar.logo.linkTextSpan.waitForDisplayed();

          browser.keys('Backspace');
          landingPage.header.topBar.logo.linkTextSpan.waitForDisplayed(2000, true);
        });

        it('should show empty input when selecting a fresh block of text', function () {
          landingPage.richTextToolbar.urlInput.getValue().should.be.empty();
        });

        it('should show existing url when selecting a link', function () {
          landingPage.richTextToolbar.urlInput.setValue('h');
          landingPage.header.topBar.logo.subtitle.click();

          selectText(landingPage.header.topBar.logo.subtitleFirstLine.selector);
          landingPage.richTextToolbar.urlInput.getValue().should.equal('h');
        });

        it('should remove existing url of selected text when click on link button', function () {
          landingPage.richTextToolbar.urlInput.setValue('h');
          landingPage.richTextToolbar.linkButton.click();

          landingPage.header.topBar.logo.linkTextSpan.waitForDisplayed(2000, true);
        });

        it('should hide both toolbar and url input when click outside', function () {
          $('body').click();

          landingPage.richTextToolbar.element.waitForDisplayed(2000, true);
        });
      });
    });
  });
});
