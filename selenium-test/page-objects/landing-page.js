'use strict';

import Page from './page';
import Section from './sections/section';
import Header from './sections/header';
import RichTextToolbar from './sections/rich-text-toolbar';
import BottomSheet from './sections/bottom-sheet';


class HeroSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      heroFirstRichTextEditor: 'div[contenteditable="true"]',
      firstRichTextBlock: 'div[contenteditable="true"] span[data-text="true"]',
      editToggle: '//div[@class="test--hero-section"]//a[@class="test--more-link"]',
      boldTextSpan: '.test--hero-title div[contenteditable="true"] span[style="font-weight: bold;"]',
      italicTextSpan: '.test--hero-title div[contenteditable="true"] span[style="font-style: italic;"]',
      linkTextSpan: '//div[@class="test--hero-title"]//span[contains(@style, "text-decoration: underline;")]',
      title: '.test--hero-title div[contenteditable="true"]',
      complaintsText: '.test--hero-complaints div[contenteditable="true"]',
      useOfForceText: '.test--hero-use-of-force div[contenteditable="true"]'
    });
  }

  edit(text) {
    this.editToggle.click();
    this.heroSection.heroFirstRichTextEditor.click();
    browser.keys(text);
  }
}

class ReportingSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      editToggle: '//div[@class="test--reporting-section"]//a[@class="test--more-link"]',
      headerTitle: '//div[@class="test--reporting-section-header"]//div[@data-contents="true"]',
      numberEntriesInput: '//div[@class="test--reporting-section"]//input',
      strategiesSelect: '//div[@class="test--reporting-section"]//select',
      cancelButton: '//div[@class="test--reporting-section"]//a[contains(@class, "cancel-button")]',
      updateButton: '//div[@class="test--reporting-section"]//a[contains(@class, "update-button")]',
      report: '//div[@class="report"]',
      moreButton: '//div[@class="test--reporting-section-header"]//a'
    });
  }
}

class FAQSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      editToggle: '//div[@class="test--faq-section"]//a[@class="test--more-link"]',
      headerTitle: '//div[@class="test--faq-section-header"]//div[@data-contents="true"]',
      numberEntriesInput: '//div[@class="test--faq-section"]//input',
      strategiesSelect: '//div[@class="test--faq-section"]//select',
      cancelButton: '//div[@class="test--faq-section"]//a[contains(@class, "cancel-button")]',
      updateButton: '//div[@class="test--faq-section"]//a[contains(@class, "update-button")]',
      faq: '//div[@class="test--faq-section"]//div[contains(@class, "test--faq-item")]',
      moreButton: '//div[@class="test--faq-section"]//a'
    });
  }
}

class VFTGSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      editToggle: '//div[@class="test--vftg-section"]//a[@class="test--more-link"]',
      headerTitle: '//*[@class="test--vftg-header"]//div[@data-block="true"]',
      datePicker: '//div[@class="test--vftg-section"]//span[contains(@style, "date-picker-pink.svg")]',
      datePickerForm: '//div[@class="react-datepicker"]',
      cancelButton: '//div[@class="test--vftg-section"]//a[contains(@class, "cancel-button")]',
      updateButton: '//div[@class="test--vftg-section"]//a[contains(@class, "update-button")]',
      content: '//span[@data-text and text()="Real Independence for Police Oversight Agencies"]',
      mostRecentEmail: '//div[@class="test--vftg-section"]//span[text()="Most Recent Email"]',
      linkPicker: '//div[@class="test--vftg-section"]//span[contains(@style, "link-pink.svg")]',
      linkInput: '//div[@class="test--vftg-section"]//div[@class="test--link-picker"]//input',
      subscribeForm: '//input[@class="subscribe-form__input"]',
      subscribeButton: '//button//span[text()="Subscribe"]',
      subscribeSuccess: '//*[@class="test--check-mark"]',
      subscribeFailure: '//*[@class="test--cross-mark"]'
    });
  }
}

class AboutSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      editToggle: '//div[@class="test--about-section"]//a[@class="test--more-link"]',
      headerTitle: '//*[@class="test--about-section-header"]//div[@data-block="true"]',
      cancelButton: '//div[@class="test--about-section"]//a[contains(@class, "cancel-button")]',
      updateButton: '//div[@class="test--about-section"]//a[contains(@class, "update-button")]',
      content: '//div[@class="test--about-section-content"]//div[@data-contents="true"]'
    });
  }
}

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

class LandingPage extends Page {
  header = new Header();
  richTextToolbar = new RichTextToolbar();
  bottomSheet = new BottomSheet();
  vftgSection = new VFTGSection();
  heroSection = new HeroSection();
  reportingSection = new ReportingSection();
  faqSection = new FAQSection();
  aboutSection = new AboutSection();
  collaborateSection = new CollaborateSection();

  open() {
    super.open('/');
    browser.element('body').waitForVisible();
  }
}

module.exports = new LandingPage();
