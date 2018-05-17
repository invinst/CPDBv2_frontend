import Section from './section';
import RichTextToolbar from './rich-text-toolbar';


class LogoSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      editButton: '.test--top-slim-header .test--edit-wrapper-edit-button',
      saveButton: '.test--top-slim-header .test--edit-wrapper-save-button',
      cancelButton: '.test--top-slim-header .test--edit-wrapper-cancel-button',
      title: '.test--top-slim-header .test--header-logo-title',
      subtitle: '.test--top-slim-header .test--header-logo-subtitle',
      subtitleFirstLine: [
        '(//div[@class="test--top-slim-header"]',
        '//div[@class="test--header-logo-subtitle"]',
        '//div[@data-block="true"])[1]',
      ].join(''),
      boldTextSpan: [
        '(//div[@class="test--top-slim-header"]',
        '//div[@class="test--header-logo-subtitle"]',
        '//span[@data-offset-key and contains(@style, "font-weight: bold;")]/span)[1]',
      ].join(''),
      italicTextSpan: [
        '(//div[@class="test--top-slim-header"]',
        '//div[@class="test--header-logo-subtitle"]',
        '//span[@data-offset-key and contains(@style, "font-style: italic;")]/span)[1]'
      ].join(''),
      linkTextSpan: [
        '(//div[@class="test--top-slim-header"]',
        '//div[@class="test--header-logo-subtitle"]',
        '//span[contains(@style, "text-decoration: underline;")]/span[@data-offset-key]/span)[1]'
      ].join('')
    });
  }
}

class TopHeader extends Section {
  logo = new LogoSection();
  richTextToolbar = new RichTextToolbar();

  constructor() {
    super();
    this.prepareElementGetters({
      mainElement: '.test--top-slim-header',
      closeButtonSelector: '.test--top-slim-header .nav-link__close-btn',
      data: '//*[@class="test--top-slim-header"]//a[text()="Data"]',
      qa: '//*[@class="test--top-slim-header"]//a[text()="Q&A"]',
      glossary: '//a[text()="Glossary"]',
      logOutButton: '.test--top-slim-header .test--logout-button',
    });
  }
}

class StickyHeader extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      mainElement: '.test--sticky-slim-header',
      closeButtonSelector: '.test--sticky-slim-header .nav-link__close-btn',
      data: '//*[@class="test--sticky-slim-header"]//a[text()="Data"]',
      qa: '//*[@class="test--sticky-slim-header"]//a[text()="Q&A"]',
      glossary: '//a[text()="Glossary"]',
      logOutButton: '.test--sticky-slim-header .test--logout-button',
    });
  }
}

module.exports = {
  TopHeader,
  StickyHeader
};
