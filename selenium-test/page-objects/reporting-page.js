import Page from './page';
import Header from './sections/header';
import BottomSheet from './sections/bottom-sheet';


class ReportingPage extends Page {
  header = new Header();
  bottomSheet = new BottomSheet();

  open() {
    super.open('/reporting/');
    browser.element('body').waitForVisible();
  }
}

module.exports = new ReportingPage();
