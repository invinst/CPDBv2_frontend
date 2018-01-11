import Section from './section';


class Footer extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      legalDisclaimer: '//a[text()="Legal"]',
    });
  }
}

module.exports = Footer;
