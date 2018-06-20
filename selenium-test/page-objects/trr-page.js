import Page from './page';
import Section from './sections/section';


class OfficerSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      officerName: '.test--officer-full-name',
      officerProfileButton: ('//*[@class="test--navigation-button" and ./span/text()="View Profile"]'),
      unitProfileButton: ('//*[@class="test--navigation-button" and ./span/text()="View Unit"]')
    });
  }
}


class TRRPage extends Page {
  officerSection = new OfficerSection();

  constructor() {
    super();

    this.prepareElementGetters({
      title: '.test--trr-title',
    });
  }

  open(id=1) {
    super.open(`/trr/${id}/`);
    browser.element('body').waitForVisible();
  }
}

module.exports = new TRRPage();
