'use strict';

import * as _ from 'lodash';

import Page from './page';


class DocumentsOverviewPage extends Page {
  constructor() {
    super();
    this.prepareElementGetters({
      docTable: '(//div[starts-with(@class, "documents-table")])[1]',
      lastBreadcrumbs: '//ul[@class="breadcrumbs"]/li[last()]',
      firstMonthSeparator: '(//div[contains(@class, "month-separator")])[1]',
      secondMonthSeparator: '(//div[contains(@class, "month-separator")])[2]',
      firstDocTitle: '(//span[contains(@class, "document-title")])[1]',
      firstDocCRID: '(//span[@class="document-crid"])[1]',
      firstDocDocCount: '(//span[@class="documents-count"])[1]',
      firstDocSource: '(//span[contains(@class, "document-source")])[1]',
      firstDocViews: '(//span[contains(@class, "view-count")])[1]',
      firstDocDownloads: '(//span[contains(@class, "download-count")])[1]',
      firstDocDate: '(//span[contains(@class, "document-date")])[1]',
      firstDocRow: '(//div[starts-with(@class, "document-row")])[1]',
      secondDocTitle: '(//span[contains(@class, "document-title")])[2]',
      secondDocCRID: '(//span[@class="document-crid"])[2]',
      secondDocDocCount: '(//span[@class="documents-count"])[2]',
      secondDocSource: '(//span[contains(@class, "document-source")])[2]',
      secondDocViews: '(//span[contains(@class, "view-count")])[2]',
      secondDocDownloads: '(//span[contains(@class, "download-count")])[2]',
      secondDocDate: '(//span[contains(@class, "document-date")])[2]',
      secondDocCRLink: '(//span[@class="document-crid-uid"]/span)[2]',
      searchBox: '//div[@class="search-box-parent"]/input',
      headerButton: '//div[@class="shareable-header-outer"]//a[@class="button"]',
    });
  }

  open(queryParams, editModeOn) {
    let url = '/documents/';

    let queries = '?' + _.map(_.toPairs(queryParams), ([key, val]) => `${key}=${val}`).join('&');
    if (queries !== '?') {
      url = url + queries;
    }

    if (editModeOn) {
      url = `/edit${url}`;
    }

    super.open(url);
    browser.element('body').waitForVisible();
  }
}

module.exports = new DocumentsOverviewPage();
