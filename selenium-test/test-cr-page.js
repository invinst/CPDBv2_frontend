'use strict';

require('should');

import crPage from './page-objects/cr-page';
import summaryPage from './page-objects/officer-summary-page';


describe('CR page', function () {
  beforeEach(function () {
    crPage.open();
  });

  it('should display complaint content and overlay', function () {
    crPage.header.title.getText().should.equal('CR 1');
    crPage.header.coaccusedDropdownButton.getText().should.equal('Coaccused with Richard Sullivan');

    crPage.infoSection.category.getText().should.equal('Operation/Personnel Violations');
    crPage.infoSection.subcategory.getText().should.equal('NEGLECT OF DUTY/CONDUCT UNBECOMING - ON DUTY');

    crPage.infoSection.officerLabel.getText().should.equal('ACCUSED OFFICER');
    crPage.infoSection.officerContent.getText().should.equal('Michael Foo\n\nBadge Unknown');
    crPage.infoSection.viewOfficerProfileButton.getText().should.equal('view officer profile');

    crPage.infoSection.complainantLabel.getText().should.equal('COMPLAINANT');
    crPage.infoSection.complainantContent.getText().should.equal('White, Male, Age 18\nBlack, Female, Age 20');
    crPage.infoSection.complainantContentItem.count.should.equal(2);
    crPage.infoSection.complainantContentItem.getText().should.equal('White, Male, Age 18');


    crPage.infoSection.finalFindingLabel.getText().should.equal('Final Finding');
    crPage.infoSection.finalFindingContent.getText().should.equal('Sustained');

    crPage.infoSection.reccOutcomeLabel.getText().should.equal('Recommended Outcome');
    crPage.infoSection.reccOutcomeContent.getText().should.equal('Separation');

    crPage.infoSection.finalOutcomeLabel.getText().should.equal('Final Outcome');
    crPage.infoSection.finalOutcomeContent.getText().should.equal('Reprimand');
  });

  it('should toggle displaying dropdown coaccused list when click on dropdown button', function () {
    crPage.header.coaccusedDropdownButton.click();
    crPage.header.overlay.waitForVisible();
    crPage.header.coaccusedList.coaccusedText.getText().should.equal('Coaccused');
    crPage.header.coaccusedList.coaccusedItem.count.should.equal(2);
    crPage.header.coaccusedList.firstListItem.getText().should.equal('Michael Foo\n\nBadge Unknown\nViewing');
    crPage.header.coaccusedList.secondListItem.getText().should.equal('Richard Sullivan\n\nBadge Unknown\nView');

    crPage.header.coaccusedDropdownButton.click();
    crPage.header.overlay.waitForVisible(2000, true);
    crPage.header.coaccusedList.coaccusedItem.waitForVisible(2000, true);
  });

  it('should hide dropdown coaccused list when click on coaccused list overlay', function () {
    crPage.header.coaccusedDropdownButton.click();
    crPage.header.overlay.waitForVisible();
    crPage.header.coaccusedList.coaccusedItem.count.should.equal(2);

    crPage.header.overlay.click();
    crPage.header.overlay.waitForVisible(2000, true);
    crPage.header.coaccusedList.coaccusedItem.waitForVisible(2000, true);
  });

  it('should do nothing when click on viewing coaccused list item', function () {
    crPage.header.coaccusedDropdownButton.click();
    crPage.header.overlay.waitForVisible();
    crPage.header.coaccusedList.firstListItem.click();
    browser.getUrl().should.match(/\/complaint\/1\/1\/$/);
    crPage.header.overlay.waitForVisible();
    crPage.header.coaccusedList.coaccusedItem.count.should.equal(2);
  });

  it('should switch to another officer profile when click on non-viewing coaccused list item', function () {
    crPage.header.coaccusedDropdownButton.click();
    crPage.header.overlay.waitForVisible();
    crPage.header.coaccusedList.secondListItem.click();
    browser.getUrl().should.match(/\/complaint\/1\/2\/$/);
  });

  it('should navigate to officer page when click on view officer profile button', function () {
    crPage.infoSection.viewOfficerProfileButton.click();
    browser.getUrl().should.match(/\/officer\/1\/$/);
    summaryPage.header.officerName.waitForVisible();
  });

  it('should display list of involvements', function () {
    crPage.involvementSection.firstInvolvementType.getText().should.equal('INVESTIGATOR');
    crPage.involvementSection.secondInvolvementType.getText().should.equal('POLICE WITNESSES');
    crPage.involvementSection.firstOfficer.getText().should.containEql('L. Skol');
    crPage.involvementSection.firstOfficer.getText().should.containEql('126 cases');
    crPage.involvementSection.secondOfficer.getText().should.containEql('R. Piwinicki');
    crPage.involvementSection.secondOfficer.getText().should.containEql('male, white');
  });

  it('should navigate to officer page when we click on officer card', function () {
    crPage.involvementSection.firstOfficer.click();
    browser.getUrl().should.match(/\/officer\/1\/$/);
  });

  it('should display list of attachments', function () {
    crPage.attachmentsSection.attachmentCount('DOCUMENTS').should.equal(2);
    crPage.attachmentsSection.attachmentCount('VIDEO').should.equal(1);
    crPage.attachmentsSection.attachmentCount('AUDIO').should.equal(1);
    crPage.attachmentsSection.getAttachment('DOCUMENTS', 1).getText().should.equal('CR Document 1');
    crPage.attachmentsSection.getAttachment('VIDEO', 1).getText().should.equal('CR Video');
    crPage.attachmentsSection.getAttachment('AUDIO', 1).getText().should.equal('CR Audio');
  });

  it('should navigate to page with attachment item url when we click on', function () {
    crPage.attachmentsSection.getAttachment('DOCUMENTS', 1).getAttribute('href').should.equal(
      'http://cr-document.com/'
    );
    crPage.attachmentsSection.getAttachment('VIDEO', 1).getAttribute('href').should.equal('http://cr-video.com/');
    crPage.attachmentsSection.getAttachment('AUDIO', 1).getAttribute('href').should.equal('http://cr-audio.com/');
  });
});

describe('CR page without attachment', function () {
  beforeEach(function () {
    crPage.open(2);
  });

  it('should show "Request Document" button', function () {
    crPage.header.title.getText().should.equal('CR 2');
    crPage.attachmentsSection.documentRequestInput.waitForVisible();
  });

  it('should show request document modal when clicks on "Request Document"', function () {
    crPage.attachmentsSection.documentRequestInput.click();
    crPage.documentRequestModalSection.emailInput.waitForVisible();
  });

  it('should accept valid email, and close modal after 1.5s', function () {
    crPage.attachmentsSection.documentRequestInput.click();
    crPage.documentRequestModalSection.emailInput.waitForVisible();
    crPage.documentRequestModalSection.emailInput.setValue('valid@email.com');
    crPage.documentRequestModalSection.submitButton.click();
    crPage.documentRequestModalSection.messageBox.waitForVisible();
    crPage.documentRequestModalSection.messageBox.getText().should.equal('Thanks for subscribing.');
    browser.waitForVisible('.test--generic-modal-content', 2000, true);
    crPage.attachmentsSection.documentRequestedMessage.waitForVisible();
  });

  it('should ignore invalid email', function () {
    crPage.attachmentsSection.documentRequestInput.click();
    crPage.documentRequestModalSection.emailInput.waitForVisible();
    crPage.documentRequestModalSection.emailInput.setValue('invalid@email.com');
    crPage.documentRequestModalSection.submitButton.click();
    crPage.documentRequestModalSection.messageBox.waitForVisible();
    crPage.documentRequestModalSection.messageBox.getText().should.equal('Sorry, we can not subscribe your email');
  });
});
