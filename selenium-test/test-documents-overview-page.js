'use strict';

require('should');

import docOverviewPage from './page-objects/documents-overview-page';


describe('Documents Overview page', function () {

  it('should display documents separated by month and year', function () {
    docOverviewPage.open({}, true);
    docOverviewPage.docTable.waitForVisible();

    docOverviewPage.firstMonthSeparator.getText().should.equal('JAN 2019');

    docOverviewPage.firstDocTitle.getText().should.equal('CRID #123456 DOCUMENT CLOUD');
    docOverviewPage.firstDocCRID.getText().should.equal('CR 123456');
    docOverviewPage.firstDocDocCount.getText().should.equal('0 documents');
    docOverviewPage.firstDocSource.getText().should.equal('https://www.documentcloud.org/');
    docOverviewPage.firstDocViews.getText().should.equal('1,000');
    docOverviewPage.firstDocDownloads.getText().should.equal('2,000');
    docOverviewPage.firstDocDate.getText().should.equal('Jan 09');

    docOverviewPage.secondMonthSeparator.getText().should.equal('FEB 2019');

    docOverviewPage.secondDocTitle.getText().should.equal('CRID #123457 COPA');
    docOverviewPage.secondDocCRID.getText().should.equal('CR 123457');
    docOverviewPage.secondDocDocCount.getText().should.equal('1 document');
    docOverviewPage.secondDocSource.getText().should.equal('https://www.chicagocopa.org/');
    docOverviewPage.secondDocViews.getText().should.equal('2,000');
    docOverviewPage.secondDocDownloads.getText().should.equal('1,000');
    docOverviewPage.secondDocDate.getText().should.equal('Feb 10');
  });

  it('should not display document counts if in non-admin mode', function () {
    docOverviewPage.open({}, false);
    docOverviewPage.docTable.waitForVisible();

    docOverviewPage.firstDocViews.waitForVisible(undefined, true);
    docOverviewPage.firstDocDownloads.waitForVisible(undefined, true);

    docOverviewPage.secondDocViews.waitForVisible(undefined, true);
    docOverviewPage.secondDocDownloads.waitForVisible(undefined, true);
  });

  it('should display documents whose title or crid match the searched text', function () {
    docOverviewPage.open();
    docOverviewPage.searchBox.waitForVisible();
    docOverviewPage.searchBox.setValue('123457');

    docOverviewPage.docTable.waitForVisible();
    docOverviewPage.firstDocTitle.getText().should.equal('CRID #123457 COPA');
    docOverviewPage.firstDocCRID.getText().should.equal('CR 123457');
  });

  it('should filter documents with crid when click on CR link', function () {
    docOverviewPage.open();
    docOverviewPage.secondDocCRLink.click();

    docOverviewPage.searchBox.getValue().should.equal('123457');
    docOverviewPage.firstDocTitle.getText().should.equal('CRID #123457 COPA');
    docOverviewPage.firstDocCRID.getText().should.equal('CR 123457');
  });

  it('should go to crawlers tracker page when the header button on the breadcrumb is clicked');

  it('should go to document detail page when the document row is clicked');

  it('should display breadcrumb', function () {
    docOverviewPage.open();
    docOverviewPage.lastBreadcrumbs.getText().should.equal('Documents Overview');
  });

  it('should display filtered documents when accessed with url that has query parameter', function () {
    docOverviewPage.open({ match: '123457' });
    docOverviewPage.docTable.waitForVisible();

    docOverviewPage.firstDocTitle.getText().should.equal('CRID #123457 COPA');
    docOverviewPage.firstDocCRID.getText().should.equal('CR 123457');
  });
});
