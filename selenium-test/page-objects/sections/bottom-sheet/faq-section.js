import Section from '../section';


class FAQSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      element: '.faq-bottom-sheet',
      question: '.test--faq-rich-text-question',
      answer: '.test--faq-rich-text-answer',
      boldTextSpan: [
        '//*[contains(@class, "test--faq-rich-text-answer")]',
        'span[@data-offset-key and contains(@style, "font-weight: bold;")]/span'
      ].join('//'),
      italicTextSpan: [
        '//*[contains(@class, "test--faq-rich-text-answer")]',
        'span[@data-offset-key and contains(@style, "font-style: italic;")]/span'
      ].join('//'),
      linkTextSpan: [
        '//*[contains(@class, "test--faq-rich-text-answer")]',
        'span[contains(@style, "text-decoration: underline;")]/span[@data-offset-key]/span'
      ].join('//')
    });
  }
}

module.exports = FAQSection;
