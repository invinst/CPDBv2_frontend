import Page from './page';


class FAQItemEditPage extends Page {


  open() {
    super.open('/edit/faq/1/');
    browser.element('body').waitForVisible();
  }
}

module.exports = new FAQItemEditPage();
