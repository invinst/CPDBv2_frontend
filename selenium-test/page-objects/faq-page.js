import Page from './page';
import { TopHeader } from './sections/header';
import Section from './sections/section';
import BottomSheet from './sections/bottom-sheet';
import RichTextToolbar from './sections/rich-text-toolbar';


class FAQSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      faq: '.test--faq-item',
      addButton: '//div[text()="[+]"]',
      faqContent: '.test--faq-item-content',
      starredCheckbox: '.test--faq-item input[type=checkbox]',
      checkedStarredCheckbox: '.test--faq-item input[type=checkbox]:checked'
    });
  }
}

class FAQPage extends Page {
  header = new TopHeader();
  bottomSheet = new BottomSheet();
  faqSection = new FAQSection();
  richTextToolbar = new RichTextToolbar();

  open() {
    super.open('/faq/');
    browser.element('body').waitForVisible();
  }

  openItemEditMode() {
    super.open('/edit/faq/1/');
    this.loginScreen.login();
    browser.element('body').waitForVisible();
  }
}

module.exports = new FAQPage();
