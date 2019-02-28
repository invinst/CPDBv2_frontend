'use strict';

require('should');

import crawlersPage from './page-objects/crawlers-page';
import { switchToRecentTab } from './utils';


describe('Crawlers Page', function () {
  beforeEach(function () {
    crawlersPage.open();
  });

  it('should render crawler table and breadcrumb', function () {
    crawlersPage.tableSection.crawlerNameHeader.getText().should.equal('CRAWLER');
    crawlersPage.tableSection.recentRunAtHeader.getText().should.equal('RECENT RUN');
    crawlersPage.tableSection.numNewDocumentsHeader.getText().should.equal('NEW DOCUMENTS');
    crawlersPage.tableSection.numDocumentsHeader.getText().should.equal('TOTAL DOCUMENTS');

    crawlersPage.tableSection.firstCrawlerName.getText().should.equal('SUMMARY_REPORTS_COPA');
    crawlersPage.tableSection.firstRecentRunAt.getText().should.equal('2019-02-20');
    crawlersPage.tableSection.firstNumNewDocuments.getText().should.equal('0');
    crawlersPage.tableSection.firstNumDocuments.getText().should.equal('284');

    crawlersPage.tableSection.breadcrumbsItem.getText().should.equal('Crawler Tracker');
  });

  it('should go to new download window when click on crawler row', function () {
    crawlersPage.tableSection.firstCrawlerRow.click();

    switchToRecentTab();
    browser.getUrl().should.equal(
      'https://lvh.me/cpdp-crawler-logs-develop/summary_reports_copa-2019-02-27-100330.txt'
    );
  });

  it('should able to scroll', function () {
    browser.scroll(0, 99999);
    browser.pause(1000);

    crawlersPage.tableSection.lastCrawlerName.getText().should.equal('DOCUMENTCLOUD');
    crawlersPage.tableSection.lastRecentRunAt.getText().should.equal('2018-11-29');
    crawlersPage.tableSection.lastNumNewDocuments.getText().should.equal('0');
    crawlersPage.tableSection.lastNumDocuments.getText().should.equal('1235');
  });
});
