'use strict';

require('should');

import crawlersPage from './page-objects/crawlers-page';


describe('Crawlers Page', function () {
  beforeEach(function () {
    crawlersPage.open();
  });

  it('should render crawler table', function () {
    crawlersPage.tableSection.crawlerNameHeader.getText().should.equal('CRAWLER');
    crawlersPage.tableSection.recentRunAtHeader.getText().should.equal('RECENT RUN');
    crawlersPage.tableSection.numNewDocumentsHeader.getText().should.equal('NEW DOCUMENTS');
    crawlersPage.tableSection.numDocumentsHeader.getText().should.equal('TOTAL DOCUMENTS');

    crawlersPage.tableSection.firstCrawlerName.getText().should.equal('SUMMARY_REPORTS_COPA');
    crawlersPage.tableSection.firstRecentRunAt.getText().should.equal('2019-02-20');
    crawlersPage.tableSection.firstNumNewDocuments.getText().should.equal('0');
    crawlersPage.tableSection.firstNumDocuments.getText().should.equal('284');
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
