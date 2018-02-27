import Section from '../section';
import OfficerSection from './officer-section';
import FAQSection from './faq-section';


class BottomSheet extends Section {
  officerSection = new OfficerSection();
  faq = new FAQSection();

  constructor() {
    super();
    this.prepareElementGetters({
      overlay: '.bottom-sheet__overlay',
      reportBottomSheet: '.report-bottom-sheet',
      reportPublicationLabel: '//span[text()="Publication"]',
      reportPublishDateLabel: '//span[text()="Publish Date"]',
      reportAuthorLabel: '//span[text()="Author"]',
      reportTitle: '.test--rich-text-title',
      reportExcerpt: '.test--rich-text-excerpt',
      reportArticleLink: '.test--rich-text-article-link',
      reportOfficerInvolved: '.test--officer-involved',
    });
  }

  clickOverlay() {
    browser.moveToObject('body', 10, 10);
    browser.buttonPress();
  }
}

module.exports = BottomSheet;
