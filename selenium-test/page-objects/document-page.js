'use strict';

import Page from './page';
import Section from './sections/section';
import LoginScreen from './sections/login-screen';

const getInfoItemSelector = (text) =>
  `//div[contains(@class, "document-info")]/*[@class="list-item" and span[text()="${text}"]]`;

class TagsSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      tagsInput: '//div[contains(@class, "main-section-tags")]//div[contains(@class, "simple-tag-editable")]',
      tags: '//div[contains(@class, "main-section-tags")]//span[@class="react-tagsinput-tag"]',
      editButton: '//div[contains(@class, "main-section-tags")]' +
        '//a[contains(@class, "hoverable-edit-wrapper-button") and text()="Edit"]',
      saveButton: '//div[contains(@class, "main-section-tags")]' +
        '//a[contains(@class, "hoverable-edit-wrapper-button") and text()="Save"]',
      cancelButton: '//div[contains(@class, "main-section-tags")]' +
        '//a[contains(@class, "hoverable-edit-wrapper-button") and text()="Cancel"]',
      firstTag: '//div[contains(@class, "main-section-tags")]//span[@class="react-tagsinput-tag"][1]',
      secondTag: '//div[contains(@class, "main-section-tags")]//span[@class="react-tagsinput-tag"][2]',
      thirdTag: '//div[contains(@class, "main-section-tags")]//span[@class="react-tagsinput-tag"][3]',
      firstTagDeleteBtn: '//div[contains(@class, "main-section-tags")]' +
        '//span[@class="react-tagsinput-tag"][1]//a[@class="react-tagsinput-remove"]',
      tagsInputTextbox: '.main-section-tags .react-tagsinput-input',
      nextUntaggedDocumentButton: '//a[@class="next-untagged-document-button"]',
    });
  }
}

class DocumentPage extends Page {
  tagsSection = new TagsSection();

  constructor() {
    super();

    this.loginScreen = new LoginScreen();
    this.prepareElementGetters({
      crid: getInfoItemSelector('CRID / UID'),
      source: getInfoItemSelector('Source'),
      crawler: getInfoItemSelector('Crawler'),
      date: getInfoItemSelector('Date'),
      views: getInfoItemSelector('Views'),
      downloads: getInfoItemSelector('Downloads'),
      notifications: getInfoItemSelector('Notifications'),
      lastEdited: '.main-section-last-edited',
      thumbnail: '.document-thumbnail-img',
      pageCount: '.document-thumbnail-page-count',
      linkedDocuments: '.linked-documents-content',
      linkedDocumentsTitle: '.linked-documents-title',
      linkedDocumentsThumbnails: '.linked-documents-thumbnail',
      documentTitle: '.main-section-title .editable-text-box-text',
      documentText: '.main-section-full-text .editable-text-box-text-multiline',
      lastUpdatedBy: '.main-section-last-edited',
    });
  }

  open(id=1, login=false) {
    super.open(`${ login ? '/edit': '' }/document/${id}/`);
    browser.element('body').waitForVisible();
    login && this.loginScreen.login();
  }
}

module.exports = new DocumentPage();
