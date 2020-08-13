'use strict';

require('should');

import crawlersPage from '../page-objects/crawlers-page';
import api from '../mock-api';
import { mockCommonApi } from '../mock-data/utils';
import { crawlersData, nextCrawlersData } from '../mock-data/crawlers-page';


describe('Crawlers Page', function () {
  beforeEach(function () {
    mockCommonApi();
    api
      .onGet('/api/v2/document-crawlers/')
      .reply(200, crawlersData);
    api
      .onGet('/api/v2/document-crawlers/', { limit: 20, offset: 20 })
      .reply(200, nextCrawlersData);

    browser.setWindowRect(0, 0, 1000, 900);
    crawlersPage.open();
  });

  it('should render crawler table and breadcrumb', function () {
    crawlersPage.tableSection.crawlerNameHeader.getText().should.equal('CRAWLER');
    crawlersPage.tableSection.recentRunAtHeader.getText().should.equal('RECENT RUN');
    crawlersPage.tableSection.numNewDocumentsHeader.getText().should.equal('NEW DOCUMENTS');
    crawlersPage.tableSection.numDocumentsHeader.getText().should.equal('TOTAL DOCUMENTS');
    crawlersPage.tableSection.numSuccessfulRuns.getText().should.equal('SUCCESSFUL RUNS');

    crawlersPage.tableSection.firstCrawlerName.getText().should.equal('SUMMARY_REPORTS_COPA');
    crawlersPage.tableSection.firstRecentRunAt.getText().should.equal('2019-02-20');
    crawlersPage.tableSection.firstNumNewDocuments.getText().should.equal('0');
    crawlersPage.tableSection.firstNumDocuments.getText().should.equal('284');
    crawlersPage.tableSection.firstSuccessfulRuns.getText().should.equal('12');

    crawlersPage.tableSection.breadcrumbsItem.getText().should.equal('Crawler Tracker');
  });

  it('should open log file modal when click on crawler row and close it when click on close button', function () {
    crawlersPage.tableSection.firstCrawlerRow.click();
    crawlersPage.tableSection.logFileModal.waitForDisplayed();
    crawlersPage.tableSection.logFileModalTitle.getText().should.equal('SUMMARY_REPORTS_COPA - 2019-02-20');
    crawlersPage.tableSection.logFileCloseButton.click();
    crawlersPage.tableSection.logFileModal.waitForDisplayed(1000, true);
  });

  it('should go to document page when click on Documents button', function () {
    crawlersPage.tableSection.documentsButton.click();
    browser.getUrl().should.containEql('/documents/');
  });

  it('should be able to scroll and should not open log file model when click on no log url crawler row', function () {
    crawlersPage.tableSection.row.count.should.equal(20);

    browser.scroll(0, 9999);
    browser.pause(1000);

    crawlersPage.tableSection.row.count.should.equal(25);
    crawlersPage.tableSection.lastCrawlerName.getText().should.equal('DOCUMENTCLOUD');
    crawlersPage.tableSection.lastRecentRunAt.getText().should.equal('2018-11-29');
    crawlersPage.tableSection.lastNumNewDocuments.getText().should.equal('0');
    crawlersPage.tableSection.lastNumDocuments.getText().should.equal('1235');
    crawlersPage.tableSection.lastSuccessfulRuns.getText().should.equal('1');

    crawlersPage.tableSection.lastCrawlerRow.click();
    crawlersPage.tableSection.logFileModal.waitForDisplayed(1000, true);
  });
});
