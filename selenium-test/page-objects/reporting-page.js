import Page from './page';
import Header from './sections/header';
import Section from './sections/section';
import BottomSheet from './sections/bottom-sheet';


class ReportingSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      report: '//div[@class="report"]',
      addButton: '//div[text()="[+]"]'
    });
  }
}

class ReportingPage extends Page {
  constructor() {
    super();
    this.header = new Header();
    this.reportingSection = new ReportingSection();
    this.bottomSheet = new BottomSheet();
  }

  open() {
    super.open('/reporting/');
    browser.element('body').waitForVisible();
  }
}

module.exports = new ReportingPage();
