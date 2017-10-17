'use strict';

import Page from './page';
import Section from './sections/section';
import Header from './sections/header';
import RichTextToolbar from './sections/rich-text-toolbar';
import BottomSheet from './sections/bottom-sheet';

class CollaborateSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      editToggle: '//div[@class="test--collaborate-section"]//a[@class="test--more-link"]',
      headerTitle: '//*[@class="test--collaborate-section-header"]//div[@data-block="true"]',
      cancelButton: '//div[@class="test--collaborate-section"]//a[contains(@class, "cancel-button")]',
      updateButton: '//div[@class="test--collaborate-section"]//a[contains(@class, "update-button")]',
      content: '//div[@class="test--collaborate-section-content"]//div[@data-contents="true"]'
    });
  }
}

class ActivityGridSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      cards: '//a[@class="test--activity-grid-section-card"]'
    });
  }
}

class GenericModalSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      overlay: '//div[@class="test--generic-modal-overlay"]',
      legalDisclaimerTitle: '//p[text()="LEGAL DISCLAIMER"]'
    });
  }
}

class LandingPage extends Page {
  header = new Header();
  richTextToolbar = new RichTextToolbar();
  bottomSheet = new BottomSheet();
  collaborateSection = new CollaborateSection();
  activityGridSection = new ActivityGridSection();
  genericModalSection = new GenericModalSection();

  open() {
    super.open('/');
    browser.element('body').waitForVisible();
  }
}

module.exports = new LandingPage();
