import Page from './page';
import Section from './sections/section';
import BottomSheet from './sections/bottom-sheet';
import Header from './sections/officer-page-header';


class SideBar extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      filterButton: '.test--filter-button',
      sortButton: '.test--sort-button',
      yearLabel: '.test--year-label',
      minimapItem: '.test--minimapitem'
    });
  }

  hoverOn(year, index) {
    browser.moveToObject(this.getMinimapItemSelector(year, index));
  }

  clickOn(year, index) {
    browser.click(this.getMinimapItemSelector(year, index));
  }

  getMinimapItemSelector(year, index) {
    return `(//*[@class="test--year-label"][text()="${year}"]/following-sibling::*/span/span)[${index}]`;
  }

  itemAt(year, index) {
    return browser.element(this.getMinimapItemSelector(year, index));
  }
}


class YearItem extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      year: '.test--timeline-item-year',
      crsLabel: '.test--crs-label',
      crsValue: '.test--crs-value',
      salaryLabel: '.test--salary-label',
      salaryValue: '.test--salary-value'
    });
  }
}


class CrItem extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      crid: '.test--cr-item-crid',
      date: '.test--cr-item-date',
      category: '.test--cr-item-category',
      subcategory: '.test--cr-item-subcategory',
      finding: '.test--cr-item-finding',
      coaccused: '.test--cr-item-coaccused'
    });
  }
}


class UnitItem extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      kind: '.test--unit-item-kind',
      date: '.test--unit-item-date',
      description: '.test--unit-item-description'
    });
  }
}


class JoinedItem extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      kind: '.test--joined-item-kind',
      date: '.test--joined-item-date',
      description: '.test--joined-item-description'
    });
  }
}


class Timeline extends Section {
  yearItem = new YearItem();
  crItem = new CrItem();
  unitItem = new UnitItem();
  joinedItem = new JoinedItem();
  constructor() {
    super();
    this.prepareElementGetters({
      cardItem: '.test--card-item',
      element: '.test--timeline-items-container'
    });
  }

  cardItemAtIndex(index) {
    return browser.element(this.cardItemSelector(index));
  }

  scrollToCardItem(index) {
    browser.element(this.cardItemSelector(index)).scroll();
  }

  cardItemSelector(index) {
    return `(//*[@class="test--card-item"])[${index}]`;
  }

  hoverOn(index) {
    browser.moveToObject(this.cardItemSelector(index));
  }
}


class OfficerTimelinePage extends Page {
  sidebar = new SideBar();
  timeline = new Timeline();
  header = new Header();
  bottomSheet = new BottomSheet();
  constructor() {
    super();

    this.prepareElementGetters({
      element: '.test--bottom-sheet-wrapper'
    });
  }

  open(officerId) {
    super.open(`/officer/${officerId}/timeline/`);
    browser.element('body').waitForVisible();
  }
}

module.exports = new OfficerTimelinePage();
