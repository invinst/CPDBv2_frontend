import Page from './page';
import Section from './sections/section';


class PinnedOfficers extends Section {
  constructor() {
    super();

    const sectionSelector = '//div[contains(@class, "test--OFFICER-section")]';
    const firstCardSelector = `(${sectionSelector}/div[@class="type-cards"]/div)[1]`;

    this.prepareElementGetters({
      title: `${sectionSelector}/div[@class="type-title"]`,
      firstCardUnpinBtn: `${firstCardSelector}/span[starts-with(@class, "item-unpin-button")]`,
      firstCardRank: `${firstCardSelector}//div[@class="officer-rank"]`,
      firstCardName: `${firstCardSelector}//div[@class="officer-name"]`,
      firstCardCRsCount: `${firstCardSelector}//div[@class="officer-complaints-count"]`,
    });
  }
}

class PinnedCRs extends Section {
  constructor() {
    super();

    const sectionSelector = '//div[contains(@class, "test--CR-section")]';
    const firstCardSelector = `(${sectionSelector}/div[@class="type-cards"]/div)[1]`;

    this.prepareElementGetters({
      title: `${sectionSelector}/div[@class="type-title"]`,
      firstCardUnpinBtn: `${firstCardSelector}/span[starts-with(@class, "item-unpin-button")]`,
      firstCardDate: `${firstCardSelector}//span[@class="cr-incident-date"]`,
      firstCardCategory: `${firstCardSelector}//span[@class="cr-category"]`,
    });
  }
}

class PinnedTRRs extends Section {
  constructor() {
    super();

    const sectionSelector = '//div[contains(@class, "test--TRR-section")]';
    const firstCardSelector = `(${sectionSelector}/div[@class="type-cards"]/div)[1]`;

    this.prepareElementGetters({
      title: `${sectionSelector}/div[@class="type-title"]`,
      firstCardUnpinBtn: `${firstCardSelector}/span[starts-with(@class, "item-unpin-button")]`,
      firstCardDate: `${firstCardSelector}//span[@class="trr-date"]`,
      firstCardCategory: `${firstCardSelector}//span[@class="trr-category"]`,
    });
  }
}

class PinboardPinnedSection extends Section {
  officers = new PinnedOfficers()
  crs = new PinnedCRs()
  trrs = new PinnedTRRs()

  constructor() {
    super();
  }
}

class PinboardPage extends Page {
  pinnedSection = new PinboardPinnedSection();

  constructor() {
    super();

    this.prepareElementGetters({
      searchBar: '.test--search-bar'
    });
  }

  open() {
    super.open('/pinboard/5cd06f2b/pinboard-title/');
    browser.element('body').waitForVisible();
  }
}

module.exports = new PinboardPage();
