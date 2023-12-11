'use strict';

require('should');

import docDedupPage from '../page-objects/document-deduplicator-page';
import api from '../mock-api';
import { mockCommonApi } from '../mock-data/utils';
import { documentsByCRIDData } from '../mock-data/documents-deduplicator-page';


describe('Document Deduplicator page', function () {
  beforeEach(function () {
    mockCommonApi();

    api
      .onPost('/api/v2/users/sign-in/', { username: 'username', password: 'password' })
      .reply(200, { 'apiAccessToken': '055a5575c1832e9123cd546fe0cfdc8607f8680c' });
    api.onGet('/api/v2/attachments/', { crid: '1000000' })
      .reply(200, documentsByCRIDData);

    docDedupPage.open(true);
    docDedupPage.loginScreen.login();
  });

  it('should display all documents related to a CRID', function () {
    docDedupPage.lastBreadcrumbs.getText().should.equal('#1000000 document deduplicator');

    docDedupPage.firstDocTitle.getText().should.equal('CRID #1000000 DOCUMENT CLOUD');
    docDedupPage.firstDocSource.getText().should.equal('https://www.documentcloud.org/');
    docDedupPage.firstDocViews.getText().should.equal('1,000');
    docDedupPage.firstDocDownloads.getText().should.equal('2,000');
    docDedupPage.firstDocDate.getText().should.equal('Jan 9, 2019');
    docDedupPage.firstDocToggleText.getText().should.equal('SHOW');

    docDedupPage.secondDocTitle.getText().should.equal('CRID #1000000 COPA');
    docDedupPage.secondDocSource.getText().should.equal('https://www.chicagocopa.org/');
    docDedupPage.secondDocViews.getText().should.equal('2,000');
    docDedupPage.secondDocDownloads.getText().should.equal('1,000');
    docDedupPage.secondDocDate.getText().should.equal('Jan 10, 2019');
    docDedupPage.secondDocToggleText.getText().should.equal('HIDE');
  });

  it('should make the document row faded when its toggle button is clicked', function () {
    api.onPatch('/api/v2/attachments/1/', { 'show': false }).reply(200, { show: false });
    docDedupPage.firstDocRow.getAttribute('class').should.not.containEql('document-faded');
    docDedupPage.firstDocToggleText.getText().should.equal('SHOW');

    docDedupPage.firstDocToggleButton.click();

    docDedupPage.firstDocRow.getAttribute('class').should.containEql('document-faded');
    docDedupPage.firstDocToggleText.getText().should.equal('HIDE');
  });
});
