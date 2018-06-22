import Section from './section';


export default class DocumentRequestModalSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      overlay: '//div[@class="test--generic-modal-overlay"]',
      content: '.test--generic-modal-content',
      emailInput: '//div[@class="test--generic-modal-content"]//input[@placeholder="Your email"]',
      submitButton: '//div[@class="test--generic-modal-content"]//input[@type="submit"]',
      messageBox: '.test--request-document-modal--message',
    });
  }
}
