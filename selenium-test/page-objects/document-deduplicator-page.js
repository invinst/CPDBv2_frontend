'use strict';

import Page from './page';


class DocumentDeduplicatorPage extends Page {
  constructor() {
    super();
    this.prepareElementGetters({
      lastBreadcrumbs: '//ul[@class="breadcrumbs"]/li[last()]/span',
      firstDocTitle: '(//span[contains(@class, "document-title")])[1]',
      firstDocSource: '(//span[contains(@class, "document-source")])[1]',
      firstDocViews: '(//span[contains(@class, "view-count")])[1]',
      firstDocDownloads: '(//span[contains(@class, "download-count")])[1]',
      firstDocDate: '(//span[contains(@class, "document-date")])[1]',
      firstDocToggleText: '(//span[@class="toggle-text"])[1]',
      firstDocRow: '(//div[starts-with(@class, "document-row")])[1]',
      firstDocToggleButton: '(//span[contains(@class, "document-toggle")]/span)[1]',
      secondDocTitle: '(//span[contains(@class, "document-title")])[2]',
      secondDocSource: '(//span[contains(@class, "document-source")])[2]',
      secondDocViews: '(//span[contains(@class, "view-count")])[2]',
      secondDocDownloads: '(//span[contains(@class, "download-count")])[2]',
      secondDocDate: '(//span[contains(@class, "document-date")])[2]',
      secondDocToggleText: '(//span[@class="toggle-text"])[2]'
    });
  }

  open(editModeOn) {
    let path = '/documents/crid/1000000/';
    if (editModeOn) {
      path = `/edit${path}`;
    }
    super.open(path);
  }
}

module.exports = new DocumentDeduplicatorPage();
