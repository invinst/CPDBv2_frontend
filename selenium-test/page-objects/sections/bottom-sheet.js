import Section from './section';


class BottomSheet extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      overlay: '.bottom-sheet__overlay',
      reportBottomSheet: '.report-bottom-sheet',
      reportTitle: '.test--rich-text-title',
      reportExcerpt: '.test--rich-text-excerpt',
      reportArticleLink: '.test--rich-text-article-link',
      faqBottomSheet: '.faq-bottom-sheet',
      faqQuestion: '.test--faq-rich-text-question',
      faqAnswer: '.test--faq-rich-text-answer'
    });
  }

  clickOverlay() {
    browser.moveToObject('body', 10, 10);
    browser.buttonPress();
  }
}

module.exports = BottomSheet;
