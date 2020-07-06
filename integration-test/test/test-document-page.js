'use strict';

require('should');
const moment = require('moment');

import documentPage from '../page-objects/document-page';
import landingPage from '../page-objects/landing-page';
import docOverviewPage from '../page-objects/documents-overview-page';


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
      documentPage.source.getText().should.endWith('chicagocopa.org');
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

      documentPage.views.waitForDisplayed(10000, true);
      documentPage.notifications.waitForDisplayed(10000, true);
      documentPage.downloads.waitForDisplayed(10000, true);
    });

    it('should go to CR page when the user clicks on crid', function () {
      documentPage.crid.click();
      browser.getUrl().should.endWith('complaint/1083633/');
    });

    it('should open the pdf when the user clicks on the big thumbnail', function () {
      documentPage.thumbnail.click();
      browser.switchWindow(
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
      documentPage.source.getText().should.endWith('chicagocopa.org');
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
      documentPage.tagsSection.tagDeleteBtns.count.should.equal(2);

      documentPage.tagsSection.tagsInputTextbox.setValue('This is a tag with more than 20 characters');
      browser.keys('Enter');
      documentPage.tagsSection.errorMessages.getText().should.equal(
        'Ensure this field has no more than 20 characters.'
      );

      documentPage.tagsSection.thirdTagDeleteBtn.click();
      documentPage.tagsSection.firstTagDeleteBtn.click();

      documentPage.tagsSection.tagsInputTextbox.setValue('chicago');
      browser.keys('Enter');
      documentPage.tagsSection.tagsInputTextbox.setValue('copa');
      browser.keys('Enter');
      documentPage.tagsSection.errorMessages.count.should.equal(0);

      documentPage.tagsSection.tags.count.should.equal(3);
      documentPage.tagsSection.tagDeleteBtns.count.should.equal(3);
      documentPage.tagsSection.firstTag.getText().should.equal('tactical');
      documentPage.tagsSection.secondTag.getText().should.equal('chicago');
      documentPage.tagsSection.thirdTag.getText().should.equal('copa');
    });

    it('should be able to update document tags by autosuggest', function () {
      browser.refresh();
      $('body').waitForDisplayed();

      documentPage.tagsSection.tags.count.should.equal(2);
      documentPage.tagsSection.firstTag.getText().should.equal('hospital');
      documentPage.tagsSection.secondTag.getText().should.equal('tactical');

      documentPage.tagsSection.tagsInputTextbox.setValue('t');
      documentPage.tagsSection.suggestionItems.waitForDisplayed();

      documentPage.tagsSection.suggestionItems.count.should.equal(2);
      documentPage.tagsSection.firstSuggestionItem.getText().should.equal('twitter');
      documentPage.tagsSection.secondSuggestionItem.getText().should.equal('Turbyville');
      documentPage.tagsSection.firstSuggestionItem.click();

      documentPage.tagsSection.tags.count.should.equal(3);
      documentPage.tagsSection.tagDeleteBtns.count.should.equal(3);
      documentPage.tagsSection.firstTag.getText().should.equal('hospital');
      documentPage.tagsSection.secondTag.getText().should.equal('tactical');
      documentPage.tagsSection.thirdTag.getText().should.equal('twitter');
    });

    it('should go to next untagged document when clicking on next-untagged document tag', function () {
      documentPage.tagsSection.nextUntaggedDocumentButton.click();
      browser.getUrl().should.containEql('/document/2/');
    });

    it('should go to document dedup page when the user clicks on link documents section', function () {
      documentPage.linkedDocuments.click();
      browser.getUrl().should.endWith('/documents/crid/1083633/');
    });
  });

  context('Authenticated user another page', function () {
    beforeEach(function () {
      landingPage.open(true);
      landingPage.header.navBar.headerLinks.documents.click();
      docOverviewPage.firstDocTitle.click();
    });

    it('should always access with edit mode on', function () {
      browser.getUrl().should.containEql('/edit/document/1/');
    });

    it('should display all document info with views, notifications, downloads', function () {
      const createdAt = moment('2019-01-09T03:11:27.441718-06:00').format('MMM D, YYYY');
      const updatedAt = '2019-02-28T20:50:10.161395-06:00';
      const updatedTime = moment(updatedAt).format('hh:mmA');
      const updatedDate = moment(updatedAt).format('MMM D, YYYY');

      documentPage.pageCount.getText().should.equal('5 pages');
      documentPage.crid.getText().should.endWith('CR 1083633');
      documentPage.source.getText().should.endWith('chicagocopa.org');
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
      landingPage.open(true);
      landingPage.header.navBar.headerLinks.documents.click();
      docOverviewPage.firstDocTitle.click();

      documentPage.tagsSection.tags.count.should.equal(2);
      documentPage.tagsSection.firstTag.getText().should.equal('hospital');
      documentPage.tagsSection.secondTag.getText().should.equal('tactical');
      documentPage.tagsSection.tagDeleteBtns.count.should.equal(2);

      documentPage.tagsSection.tagsInputTextbox.setValue('This is a tag with more than 20 characters');
      browser.keys('Enter');
      documentPage.tagsSection.errorMessages.getText().should.equal(
        'Ensure this field has no more than 20 characters.'
      );

      documentPage.tagsSection.thirdTagDeleteBtn.click();
      documentPage.tagsSection.firstTagDeleteBtn.click();

      documentPage.tagsSection.tagsInputTextbox.setValue('chicago');
      browser.keys('Enter');
      documentPage.tagsSection.tagsInputTextbox.setValue('copa');
      browser.keys('Enter');
      documentPage.tagsSection.errorMessages.count.should.equal(0);

      documentPage.tagsSection.tags.count.should.equal(3);
      documentPage.tagsSection.tagDeleteBtns.count.should.equal(3);
      documentPage.tagsSection.firstTag.getText().should.equal('tactical');
      documentPage.tagsSection.secondTag.getText().should.equal('chicago');
      documentPage.tagsSection.thirdTag.getText().should.equal('copa');
    });

    it('should go to next untagged document when clicking on next-untagged document tag', function () {
      documentPage.tagsSection.nextUntaggedDocumentButton.click();
      browser.getUrl().should.containEql('/document/2/');
    });

    it('should go to document dedup page when the user clicks on link documents section', function () {
      documentPage.linkedDocuments.click();
      browser.getUrl().should.endWith('/documents/crid/1083633/');
    });
  });
});
