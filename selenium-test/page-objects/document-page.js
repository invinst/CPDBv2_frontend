'use strict';

import Page from './page';
import Section from './sections/section';
import LoginScreen from './sections/login-screen';

const getInfoItemSelector = (text) =>
  `//div[contains(@class, "document-info")]//*[@class="list-item" and span[text()="${text}"]]`;

class TagsSection extends Section {
  constructor() {
    super('', '//div[contains(@class, "main-section-tags")]');

    this.prepareElementGetters({
      tagsInput: '//div[contains(@class, "simple-tag-editable")]',
      tags: '//span[@class="react-tagsinput-tag"]',
      editButton: '//a[contains(@class, "hoverable-edit-wrapper-button") and text()="Edit"]',
      saveButton: '//a[contains(@class, "hoverable-edit-wrapper-button") and text()="Save"]',
      cancelButton: '//a[contains(@class, "hoverable-edit-wrapper-button") and text()="Cancel"]',
      firstTag: '//span[@class="react-tagsinput-tag"][1]',
      secondTag: '//span[@class="react-tagsinput-tag"][2]',
      thirdTag: '//span[@class="react-tagsinput-tag"][3]',
      tagDeleteBtns: '//span[@class="react-tagsinput-tag"]//a[@class="react-tagsinput-remove"]',
      firstTagDeleteBtn: '//span[@class="react-tagsinput-tag"][1]//a[@class="react-tagsinput-remove"]',
      tagsInputTextbox: '//*[@class="react-tagsinput-input"]',
      nextUntaggedDocumentButton: '//a[@class="next-untagged-document-button"]',
      errorMessages: '//*[@class="error-messages"]',
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
    $('body').waitForDisplayed();
    login && this.loginScreen.login();
  }
}

module.exports = new DocumentPage();
