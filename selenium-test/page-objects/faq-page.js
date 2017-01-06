import Page from './page';
import Header from './sections/header';
import Section from './sections/section';
import BottomSheet from './sections/bottom-sheet';


class FAQSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      faq: '.test--faq-item',
      addButton: '//div[text()="[+]"]',
      faqContent: '.test--faq-item-content'
    });
  }
}

class FAQPage extends Page {
  header = new Header();
  bottomSheet = new BottomSheet();
  faqSection = new FAQSection();

  open() {
    super.open('/faq/');
    browser.element('body').waitForVisible();
  }
}

module.exports = new FAQPage();
