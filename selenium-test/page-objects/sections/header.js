import Section from './section';


class TopHeader extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      mainElement: '.test--top-slim-header',
      closeButtonSelector: '.test--top-slim-header .nav-link__close-btn',
      headerLogoSelector: '.test--top-slim-header .test--header-logo',
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
      headerLogoSelector: '.test--sticky-slim-header .test--header-logo',
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
