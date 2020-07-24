'use strict';

require('should');

import docOverviewPage from '../page-objects/documents-overview-page';
import api from '../mock-api';
import { mockCommonApi } from '../mock-data/utils';
import { documentsData, authenticatedDocumentsData, searchDocumentsData } from '../mock-data/documents-overview-page';


describe('Documents Overview page', function () {
  beforeEach(function () {
    mockCommonApi();
    api
      .onGet('/api/v2/attachments/', { authenticated: true })
      .reply(200, authenticatedDocumentsData);
    api.onGet('/api/v2/attachments/').reply(200, documentsData);
  });

  it('should display documents separated by month and year', function () {
    api
      .onPost('/api/v2/users/sign-in/', { username: 'username', password: 'password' })
      .reply(200, { 'apiAccessToken': '055a5575c1832e9123cd546fe0cfdc8607f8680c' });
    docOverviewPage.open({}, true);
    docOverviewPage.docTable.waitForDisplayed();

    docOverviewPage.firstMonthSeparator.getText().should.equal('JAN 2019');

    docOverviewPage.firstDocTitle.getText().should.equal('CRID #123456 DOCUMENT CLOUD');
    docOverviewPage.firstDocCRID.getText().should.equal('CR 123456');
    docOverviewPage.firstDocDocCount.getText().should.equal('1 document');
    docOverviewPage.firstDocSource.getText().should.equal('https://www.documentcloud.org/');
    docOverviewPage.firstDocViews.getText().should.equal('1,000');
    docOverviewPage.firstDocDownloads.getText().should.equal('2,000');
    docOverviewPage.firstDocDate.getText().should.equal('Jan 09');

    docOverviewPage.secondMonthSeparator.getText().should.equal('FEB 2019');

    docOverviewPage.secondDocTitle.getText().should.equal('CRID #123457 COPA');
    docOverviewPage.secondDocCRID.getText().should.equal('CR 123457');
    docOverviewPage.secondDocDocCount.getText().should.equal('2 documents');
    docOverviewPage.secondDocSource.getText().should.equal('https://www.chicagocopa.org/');
    docOverviewPage.secondDocViews.getText().should.equal('2,000');
    docOverviewPage.secondDocDownloads.getText().should.equal('1,000');
    docOverviewPage.secondDocDate.getText().should.equal('Feb 10');
  });

  it('should not display document counts if in non-admin mode', function () {
    docOverviewPage.open({}, false);
    docOverviewPage.docTable.waitForDisplayed();

    docOverviewPage.firstDocViews.waitForDisplayed(undefined, true);
    docOverviewPage.firstDocDownloads.waitForDisplayed(undefined, true);

    docOverviewPage.secondDocViews.waitForDisplayed(undefined, true);
    docOverviewPage.secondDocDownloads.waitForDisplayed(undefined, true);
  });

  it('should display documents whose title or crid match the searched text', function () {
    api.onGet('/api/v2/attachments/', { match: '123457' }).reply(200, searchDocumentsData);

    docOverviewPage.open();
    docOverviewPage.searchBox.waitForDisplayed();
    docOverviewPage.searchBox.setValue('123457');

    docOverviewPage.docTable.waitForDisplayed();
    docOverviewPage.firstDocTitle.getText().should.equal('CRID #123457 COPA');
    docOverviewPage.firstDocCRID.getText().should.equal('CR 123457');
  });

  it('should filter documents with crid when click on CR link', function () {
    api.onGet('/api/v2/attachments/', { match: '123457' }).reply(200, searchDocumentsData);

    docOverviewPage.open();
    docOverviewPage.secondDocCRLink.click();

    docOverviewPage.searchBox.getValue().should.equal('123457');
    docOverviewPage.firstDocTitle.getText().should.equal('CRID #123457 COPA');
    docOverviewPage.firstDocCRID.getText().should.equal('CR 123457');
  });

  it('should go to crawlers tracker page when the header button on the breadcrumb is clicked', function () {
    docOverviewPage.open();
    docOverviewPage.headerButton.click();

    browser.getUrl().should.match(/\/crawlers\//);
  });

  it('should go to document detail page when the document row is clicked', function () {
    docOverviewPage.open();
    docOverviewPage.firstDocRow.click();

    browser.getUrl().should.match(/\/document\/1\//);
  });

  it('should display breadcrumb', function () {
    docOverviewPage.open();
    docOverviewPage.lastBreadcrumbs.getText().should.equal('Documents Overview');
  });

  it('should display filtered documents when accessed with url that has query parameter', function () {
    api.onGet('/api/v2/attachments/', { match: '123457' }).reply(200, searchDocumentsData);

    docOverviewPage.open({ match: '123457' });
    docOverviewPage.docTable.waitForDisplayed();

    docOverviewPage.firstDocTitle.getText().should.equal('CRID #123457 COPA');
    docOverviewPage.firstDocCRID.getText().should.equal('CR 123457');
  });
});
