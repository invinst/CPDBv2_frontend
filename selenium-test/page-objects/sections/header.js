import Section from './section';


class Header extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      closeButtonSelector: '.nav-link__close-btn',
      headerLogoSelector: '.test--header-logo',
      reporting: '//a[text()="Reporting"]',
      faq: '//a[text()="FAQ"]',
      collaborate: '//a[text()="Collaborate"]',
      legalDisclaimer: '//a[text()="Legal Disclaimer"]',
      logOutButton: '.test--logout-button',
    });
  }
}

module.exports = Header;
