import Page from './page';
import Header from './sections/header';
import Section from './sections/section';
import BottomSheet from './sections/bottom-sheet';


class ReportingSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      report: '//div[@class="report"]',
      secondReport: '(//div[@class="report"])[2]',
      addButton: '//div[text()="[+]"]'
    });
  }
}

class ReportingPage extends Page {
  header = new Header();
  reportingSection = new ReportingSection();
  bottomSheet = new BottomSheet();

  open() {
    super.open('/reporting/');
    browser.element('body').waitForVisible();
  }

  waitForFullyAvailable() {
    browser.waitUntil(() => {
      return browser.getUrl().indexOf('/reporting/') !== -1
        && browser.elements('.test--route-transition-element').value.length == 1;
    }, 20000);
  }
}

module.exports = new ReportingPage();
