'use strict';

require('should');
const moment = require('moment');

import documentPage from './page-objects/document-page';


describe('Document page', function () {
  context('Unauthenticated user', function () {
    beforeEach(function () {
      documentPage.open();
    });

    it('should display all document info without views, notifications, downloads', function () {
      const createdAt = moment('2019-01-09T03:11:27.441718-06:00').format('MMM D, YYYY');
      const updatedAt = '2019-02-28T20:50:10.161395-06:00';
      const updatedTime = moment(updatedAt).format('hh:mmA');
      const updatedDate = moment(updatedAt).format('MMM D, YYYY');

      documentPage.crid.getText().should.endWith('CR 1083633');
      documentPage.source.getText().should.endWith(
        'https://www.chicagocopa.org/wp-content/uploads/2017/03/TRR-HOSPITAL-REDACTED.pdf'
      );
      documentPage.crawler.getText().should.endWith('Chicago COPA');
      documentPage.date.getText().should.endWith(createdAt);
      documentPage.pageCount.getText().should.equal('5 pages');
      documentPage.linkedDocumentsTitle.getText().should.equal('Linked Documents (2)');
      documentPage.linkedDocumentsThumbnails.count.should.equal(2);
      documentPage.documentTitle.getText().should.equal(
        'CRID 1083633 CR CRID 1083633 CR Tactical Response Report 2 (Glim)'
      );
      documentPage.documentText.getText().should.equal(
        'TACTICAL RESPONSE Police Department\n1. DATE OF INCIDENT TIME 2. ADDRESS OF OCCURRENCE'
      );
      documentPage.lastUpdatedBy.getText().should.equal(
        `This document was last edited by John Doe at ${ updatedTime } on ${ updatedDate }`
      );

      documentPage.views.waitForVisible(10000, true);
      documentPage.notifications.waitForVisible(10000, true);
      documentPage.downloads.waitForVisible(10000, true);
    });

    it('should go to CR page when the user clicks on crid', function () {
      documentPage.crid.click();
      browser.getUrl().should.endWith('complaint/1083633/');
    });

    it('should open the pdf when the user clicks on the big thumbnail', function () {
      documentPage.thumbnail.click();
      browser.getUrl().should.equal(
        'https://assets.documentcloud.org/documents/5680384/CRID-1083633-CR-CRID-1083633-CR-Tactical.pdf'
      );
    });

    it('should go to document overview page when the user clicks on link documents section', function () {
      documentPage.linkedDocuments.click();
      browser.getUrl().should.endWith('/documents/?match=1083633/');
    });
  });

  context('Authenticated user', function () {
    beforeEach(function () {
      documentPage.open(1, true);
    });

    it('should display all document info with views, notifications, downloads', function () {
      const createdAt = moment('2019-01-09T03:11:27.441718-06:00').format('MMM D, YYYY');
      const updatedAt = '2019-02-28T20:50:10.161395-06:00';
      const updatedTime = moment(updatedAt).format('hh:mmA');
      const updatedDate = moment(updatedAt).format('MMM D, YYYY');

      documentPage.pageCount.getText().should.equal('5 pages');
      documentPage.crid.getText().should.endWith('CR 1083633');
      documentPage.source.getText().should.endWith(
        'https://www.chicagocopa.org/wp-content/uploads/2017/03/TRR-HOSPITAL-REDACTED.pdf'
      );
      documentPage.crawler.getText().should.endWith('Chicago COPA');
      documentPage.date.getText().should.endWith(createdAt);
      documentPage.linkedDocumentsTitle.getText().should.equal('Linked Documents (2)');
      documentPage.linkedDocumentsThumbnails.count.should.equal(2);
      documentPage.documentTitle.getText().should.equal(
        'CRID 1083633 CR CRID 1083633 CR Tactical Response Report 2 (Glim)'
      );
      documentPage.tagsSection.tags.count.should.equal(2);
      documentPage.tagsSection.firstTag.getText().should.equal('hospital');
      documentPage.tagsSection.secondTag.getText().should.equal('tactical');
      documentPage.documentText.getText().should.equal(
        'TACTICAL RESPONSE Police Department\n1. DATE OF INCIDENT TIME 2. ADDRESS OF OCCURRENCE'
      );

      documentPage.lastUpdatedBy.getText().should.equal(
        `This document was last edited by John Doe at ${ updatedTime } on ${ updatedDate }`
      );

      documentPage.views.getText().should.endWith('1,000');
      documentPage.downloads.getText().should.endWith('100');
      documentPage.notifications.getText().should.endWith('10');
    });

    it('should be able to update document tags', function () {
      documentPage.tagsSection.tags.count.should.equal(2);
      documentPage.tagsSection.firstTag.getText().should.equal('hospital');
      documentPage.tagsSection.secondTag.getText().should.equal('tactical');

      browser.moveToObject(documentPage.tagsSection.tagsInput.selector);
      documentPage.tagsSection.editButton.click();
      documentPage.tagsSection.firstTagDeleteBtn.click();
      documentPage.tagsSection.tagsInputTextbox.setValue('chicago');
      browser.keys('Enter');
      documentPage.tagsSection.tagsInputTextbox.setValue('copa');
      browser.keys('Enter');

      documentPage.tagsSection.cancelButton.click();

      documentPage.tagsSection.tags.count.should.equal(2);
      documentPage.tagsSection.firstTag.getText().should.equal('hospital');
      documentPage.tagsSection.secondTag.getText().should.equal('tactical');

      browser.moveToObject(documentPage.tagsSection.tagsInput.selector);
      documentPage.tagsSection.editButton.click();
      documentPage.tagsSection.firstTagDeleteBtn.click();

      documentPage.tagsSection.tagsInputTextbox.setValue('chicago');
      browser.keys('Enter');
      documentPage.tagsSection.tagsInputTextbox.setValue('copa');
      browser.keys('Enter');

      browser.moveToObject(documentPage.tagsSection.tagsInput.selector);
      documentPage.tagsSection.saveButton.click();

      documentPage.tagsSection.tags.count.should.equal(3);
      documentPage.tagsSection.firstTag.getText().should.equal('tactical');
      documentPage.tagsSection.secondTag.getText().should.equal('chicago');
      documentPage.tagsSection.thirdTag.getText().should.equal('copa');
    });

    it('should go to document dedup page when the user clicks on link documents section', function () {
      documentPage.linkedDocuments.click();
      browser.getUrl().should.endWith('/documents/crid/1083633/');
    });
  });
});
