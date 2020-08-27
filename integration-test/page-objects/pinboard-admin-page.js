import Page from './page';
import Section from './sections/section';


const nthListWidgetItem = (parentSelector, n) => `(${parentSelector}//li[contains(@class, "list-widget-item")])[${n}]`;
class ListWidgetItem extends Section {
  constructor(parentSelector='', mainElementSelector='') {
    super(parentSelector, mainElementSelector);

    this.prepareElementGetters({
      name: '//p[@class="list-widget-list-item-name"]',
      subText: '//p[@class="list-widget-list-item-count"]',
      visualToken: '//div[@class="list-widget-list-item-chart-wrapper"]',
    });
  }
}

const nthListWidget = n => `//div[contains(@class, "list-widget__list-widget--")][${n}]`;
class ListWidget extends Section {
  constructor(parentSelector='', mainElementSelector='') {
    super(parentSelector, mainElementSelector);

    this.prepareElementGetters({
      header: '//h5[@class="list-widget-header"]',
      items: '//li[contains(@class, "list-widget-item")]',
      viewMoreButton: '//div[contains(@class, "rc-collapse-header")]',
      lastCollapsibleItem:
        '(//div[contains(@class, "rc-collapse-content")]//li[contains(@class, "list-widget-item")])[last()]',
    });
    this.firstItem = new ListWidgetItem('', nthListWidgetItem(this.mainElementSelector, 1));
    this.secondItem = new ListWidgetItem('', nthListWidgetItem(this.mainElementSelector, 2));
    this.thirdItem = new ListWidgetItem('', nthListWidgetItem(this.mainElementSelector, 3));
  }
}

class PinboardInfo extends Section {
  constructor(parentSelector='', mainElementSelector='') {
    super(parentSelector, mainElementSelector);

    this.prepareElementGetters({
      createdAtTitle: '(//span[@class="list-item-title"])[1]',
      createdAtValue: '(//span[@class="list-item-text has-title"])[1]',
      childrenTitle: '(//span[@class="list-item-title"])[2]',
      childrenValue: '(//span[@class="list-item-text has-title"])[2]',
    });
  }
}

class PinboardPreviewPane extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      callToAction: '//div[contains(@class, "new-call-to-action-widget")]',
      title: '//div[@class="title-widget-title"]',
      description: '//div[contains(@class, "title-widget-subtitle")]',
      info: PinboardInfo,
      socialGraph: '//div[@class="static-social-graph"]',
    });
    this.pinnedOfficers = new ListWidget(this.mainElementSelector, nthListWidget(1));
    this.pinnedAllegations = new ListWidget(this.mainElementSelector, nthListWidget(2));
    this.pinnedTRRs = new ListWidget(this.mainElementSelector, nthListWidget(3));
  }
}

class PinboardRow extends Section {
  constructor(mainElementSelector) {
    super('', mainElementSelector);

    this.prepareElementGetters({
      id: '//span[@class="cell pinboard-id"]',
      title: '//span[@class="cell pinboard-title"]',
      pinned: '//span[@class="cell pinboard-pinned"]',
      children: '//span[@class="cell pinboard-children"]',
      date: '//span[@class="cell pinboard-date"]',
    });
  }
}

const nthMonthSeparator = n => `(//div[contains(@class, "month-separator")])[${n}]`;
const nthPinboardRow = n => `(//div[contains(@class, "pinboard-row") and not(contains(@class, "header"))])[${n}]`;
class PinboardsTableSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      firstMonthSeparator: nthMonthSeparator(1),
      secondMonthSeparator: nthMonthSeparator(2),
      pinboardRows: '//div[contains(@class, "pinboard-row") and not(contains(@class, "header"))]',
    });
    this.headerRow = new PinboardRow('//div[contains(@class, "pinboard-row") and contains(@class, "header")]');
    this.firstPinboardRow = new PinboardRow(nthPinboardRow(1));
    this.secondPinboardRow = new PinboardRow(nthPinboardRow(2));
  }
}

class PinboardAdminPage extends Page {
  pinboardTables = new PinboardsTableSection();
  pinboardPreviewPane = new PinboardPreviewPane();

  constructor() {
    super();

    this.prepareElementGetters({
      overlay: '.overlay',
      searchBox: '//div[@class="search-box-parent"]/input',
      firstPinboardTitle: '(//span[contains(@class, "pinboard-title")])[2]',
    });
  }

  open() {
    super.open('/view-all-pinboards/');
  }
}

module.exports = new PinboardAdminPage();
