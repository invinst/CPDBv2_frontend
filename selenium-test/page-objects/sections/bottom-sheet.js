import Section from './section';


class BottomSheet extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      reportBottomSheet: '//div[@class="report-bottom-sheet"]',
      faqBottomSheet: '//div[@class="faq-bottom-sheet"]',
      overlay: '//*[@class="bottom-sheet__overlay"]',
      reportTitle: '//div[@class="test--rich-text-title"]',
      reportExcerpt: '//div[@class="test--rich-text-excerpt"]',
      reportArticleLink: '//div[@class="test--rich-text-article-link"]'
    });
  }

  clickOverlay() {
    browser.moveToObject('body', 10, 10);
    browser.buttonPress();
  }
}

module.exports = BottomSheet;
