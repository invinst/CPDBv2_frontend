import Section from './section';


export default class DocumentRequestModalSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      overlay: '//div[contains(@class, "generic-modal__generic-modal")]',
      content: '.generic-modal-content',
      emailInput: '//div[@class="generic-modal-content"]//input[@placeholder="Your email"]',
      submitButton: '//div[@class="generic-modal-content"]//input[@type="submit"]',
      messageBox: '.request-document-message-box',
    });
  }
}
