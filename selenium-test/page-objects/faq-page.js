import Page from './page';
import Header from './sections/header';
import BottomSheet from './sections/bottom-sheet';


class FAQPage extends Page {
  constructor() {
    super();
    this.header = new Header();
    this.bottomSheet = new BottomSheet();
  }

  open() {
    super.open('/faq/');
    browser.element('body').waitForVisible();
  }
}

module.exports = new FAQPage();
