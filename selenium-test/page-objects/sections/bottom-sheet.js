import Section from './section';


class BottomSheet extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      reportBottomSheet: '//div[@class="report-bottom-sheet"]',
      faqBottomSheet: '//div[@class="faq-bottom-sheet"]',
      overlay: '//*[@class="bottom-sheet__overlay"]'
    });
  }

  clickOverlay() {
    browser.moveToObject('body', 10, 10);
    browser.buttonPress();
  }
}

module.exports = BottomSheet;
