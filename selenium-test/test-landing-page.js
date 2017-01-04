'use strict';

require('should');

import landingPage from './page-objects/landing-page';


describe('landing page', function () {
  beforeEach(function () {
    landingPage.open();
  });

  it('should enter edit mode when press ESCAPE', function () {
    browser.keys('Escape');

    landingPage.currentBasePath.should.equal('/edit/');
  });

  it('should exit edit mode when press ESCAPE again', function () {
    browser.keys('Escape');
    browser.keys('Escape');

    landingPage.currentBasePath.should.equal('/');
  });

  it('should show login screen if not logged-in when entering edit mode', function () {
    browser.keys('Escape');
    landingPage.loginScreen.loginModal.waitForVisible();
  });

  it('should not show login screen if already logged-in when entering edit mode', function () {
    browser.keys('Escape');
    landingPage.loginScreen.login();

    browser.keys('Escape');
    browser.keys('Escape');

    browser.pause(500);
    landingPage.loginScreen.loginModal.waitForVisible(2000, true);
  });

  context('edit mode on', function () {
    beforeEach(function () {
      landingPage.openEditMode();
    });

    function elementShouldTriggerRichTextToolbar(el) {
      landingPage.selectText(el.selector);
      landingPage.richTextToolbar.element.waitForVisible();
    }

    describe('hero section', function () {
      it('should allow editting of title, complaints and use of force paragraphs', function () {
        landingPage.heroSection.editToggle.click();
        elementShouldTriggerRichTextToolbar(landingPage.heroSection.title);
        elementShouldTriggerRichTextToolbar(landingPage.heroSection.complaintsText);
        elementShouldTriggerRichTextToolbar(landingPage.heroSection.useOfForceText);
      });
    });

    describe('reporting section', function () {
      beforeEach(function () {
        landingPage.reportingSection.editToggle.click();
      });

      it('should allow editting of header and randomizer strategies', function () {
        elementShouldTriggerRichTextToolbar(landingPage.reportingSection.headerTitle);

        landingPage.reportingSection.numberEntriesInput.waitForVisible();
        landingPage.reportingSection.strategiesSelect.waitForVisible();
        landingPage.reportingSection.cancelButton.waitForVisible();
        landingPage.reportingSection.updateButton.waitForVisible();
      });

      it('should disable editting screen when click on Cancel', function () {
        landingPage.reportingSection.cancelButton.click();

        landingPage.reportingSection.editToggle.waitForVisible();
        landingPage.reportingSection.numberEntriesInput.waitForVisible(2000, true);
        landingPage.reportingSection.strategiesSelect.waitForVisible(2000, true);
        landingPage.reportingSection.cancelButton.waitForVisible(2000, true);
        landingPage.reportingSection.updateButton.waitForVisible(2000, true);
      });
    });

    describe('FAQ section', function () {
      beforeEach(function () {
        landingPage.faqSection.editToggle.click();
      });

      it('should allow editting of header and randomizer strategies', function () {
        elementShouldTriggerRichTextToolbar(landingPage.faqSection.headerTitle);
        landingPage.faqSection.numberEntriesInput.waitForVisible();
        landingPage.faqSection.strategiesSelect.waitForVisible();
        landingPage.faqSection.cancelButton.waitForVisible();
        landingPage.faqSection.updateButton.waitForVisible();
      });

      it('should disable editting screen when click on Cancel', function () {
        landingPage.faqSection.cancelButton.click();

        landingPage.faqSection.editToggle.waitForVisible();
        landingPage.faqSection.numberEntriesInput.waitForVisible(2000, true);
        landingPage.faqSection.strategiesSelect.waitForVisible(2000, true);
        landingPage.faqSection.cancelButton.waitForVisible(2000, true);
        landingPage.faqSection.updateButton.waitForVisible(2000, true);
      });
    });

    describe('VFTG section', function () {
      beforeEach(function () {
        landingPage.vftgSection.editToggle.click();
      });

      it('should allow editting of header, date and links', function () {
        elementShouldTriggerRichTextToolbar(landingPage.vftgSection.headerTitle);
        landingPage.vftgSection.datePicker.waitForVisible();
        landingPage.vftgSection.cancelButton.waitForVisible();
        landingPage.vftgSection.updateButton.waitForVisible();
        landingPage.vftgSection.content.waitForVisible();
        landingPage.vftgSection.mostRecentEmail.waitForVisible();
        landingPage.vftgSection.linkPicker.waitForVisible();
        landingPage.vftgSection.subscribeForm.waitForVisible();
        landingPage.vftgSection.subscribeButton.waitForVisible();
      });

      it('should disable editting screen when click on Cancel', function () {
        landingPage.vftgSection.cancelButton.click();

        landingPage.vftgSection.datePicker.waitForVisible(2000, true);
        landingPage.vftgSection.cancelButton.waitForVisible(2000, true);
        landingPage.vftgSection.updateButton.waitForVisible(2000, true);
        landingPage.vftgSection.linkPicker.waitForVisible(2000, true);
      });

      it('should show date picker after click on date picker button', function () {
        landingPage.vftgSection.datePicker.click();

        landingPage.vftgSection.datePickerForm.waitForVisible();
      });

      it('should show link input field after click on link picker', function () {
        landingPage.vftgSection.linkPicker.click();

        landingPage.vftgSection.linkInput.waitForVisible();
      });
    });

    describe('About section', function () {
      beforeEach(function () {
        landingPage.aboutSection.editToggle.click();
      });

      it('should allow editting of header and content paragraphs', function () {
        elementShouldTriggerRichTextToolbar(landingPage.aboutSection.headerTitle);
        elementShouldTriggerRichTextToolbar(landingPage.aboutSection.content);
        landingPage.aboutSection.cancelButton.waitForVisible();
        landingPage.aboutSection.updateButton.waitForVisible();
      });

      it('should disable editting screen when click on Cancel', function () {
        landingPage.aboutSection.cancelButton.click();

        landingPage.aboutSection.cancelButton.waitForVisible(2000, true);
        landingPage.aboutSection.updateButton.waitForVisible(2000, true);
      });
    });

    describe('Collaborate section', function () {
      beforeEach(function () {
        landingPage.collaborateSection.editToggle.click();
      });

      it('should allow editting of header and content paragraphs', function () {
        elementShouldTriggerRichTextToolbar(landingPage.collaborateSection.headerTitle);
        elementShouldTriggerRichTextToolbar(landingPage.collaborateSection.content);
        landingPage.collaborateSection.cancelButton.waitForVisible();
        landingPage.collaborateSection.updateButton.waitForVisible();
      });

      it('should disable editting screen when click on Cancel', function () {
        landingPage.collaborateSection.cancelButton.click();

        landingPage.collaborateSection.cancelButton.waitForVisible(2000, true);
        landingPage.collaborateSection.updateButton.waitForVisible(2000, true);
      });
    });
  });

  context('edit mode off', function () {
    describe('reporting section', function () {
      it('should display 8 reports', function () {
        landingPage.reportingSection.report.count.should.equal(8);
      });

      it('should open report bottom sheet when clicked on', function () {
        landingPage.reportingSection.report.click();

        landingPage.bottomSheet.reportBottomSheet.waitForVisible();
      });

      it('should navigate to reporting page when click on More button', function () {
        landingPage.reportingSection.moreButton.click();

        landingPage.currentBasePath.should.equal('/reporting/');
      });
    });

    describe('FAQ section', function () {
      it('should display 5 FAQs', function () {
        landingPage.faqSection.faq.count.should.equal(5);
      });

      it('should open FAQ bottom sheet when clicked on', function () {
        landingPage.faqSection.faq.click();

        landingPage.bottomSheet.faqBottomSheet.waitForVisible();
      });

      it('should navigate to faq page when click on More button', function () {
        landingPage.faqSection.moreButton.click();

        landingPage.currentBasePath.should.equal('/faq/');
      });
    });

    describe('VFTG section', function () {
      it('should show tick mark when register an email successfully', function () {
        landingPage.vftgSection.subscribeForm.setValue('valid@email.com');
        landingPage.vftgSection.subscribeButton.click();

        landingPage.vftgSection.subscribeSuccess.waitForVisible(2000);
      });

      it('should show cross mark when the email is invalid', function () {
        landingPage.vftgSection.subscribeForm.setValue('invalid@email.com');
        landingPage.vftgSection.subscribeButton.click();

        landingPage.vftgSection.subscribeFailure.waitForVisible(2000);
      });
    });
  });
});
