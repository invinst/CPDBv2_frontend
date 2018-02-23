import Section from './section';


class LogoSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      editButton: '.test--top-slim-header .test--edit-wrapper-edit-button',
      saveButton: '.test--top-slim-header .test--edit-wrapper-save-button',
      cancelButton: '.test--top-slim-header .test--edit-wrapper-cancel-button',
      title: '.test--top-slim-header .test--header-logo-title',
      subtitle: '.test--top-slim-header .test--header-logo-subtitle'
    });
  }
}

class TopHeader extends Section {
  logo = new LogoSection();

  constructor() {
    super();
    this.prepareElementGetters({
      mainElement: '.test--top-slim-header',
      closeButtonSelector: '.test--top-slim-header .nav-link__close-btn',
      data: '//*[@class="test--top-slim-header"]//a[text()="Data"]',
      faq: '//*[@class="test--top-slim-header"]//a[text()="FAQ"]',
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
      faq: '//*[@class="test--sticky-slim-header"]//a[text()="FAQ"]',
      glossary: '//a[text()="Glossary"]',
      logOutButton: '.test--sticky-slim-header .test--logout-button',
    });
  }
}

module.exports = {
  TopHeader,
  StickyHeader
};
