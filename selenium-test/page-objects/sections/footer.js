import Section from './section';


class Footer extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      legalDisclaimer: '//a[text()="Legal"]',
      invinstLogo: '.test--footer-invinst-logo'
    });
  }
}

module.exports = Footer;
