'use strict';


require('should');

import trrPage from './page-objects/trr-page';


describe('TRR page', function () {
  beforeEach(function () {
    trrPage.open();
  });

  it('should display officer section', function () {
    trrPage.title.waitForVisible();

    trrPage.title.getText().should.equal('TRR 1');
    trrPage.officerSection.officerName.getText().should.equal('Bernadette Kelly');
  });


  it('should go to officer profile page when clicking on the Officer Row', function () {
    trrPage.officerSection.officerRow.waitForVisible();
    trrPage.officerSection.officerRow.click();

    browser.getUrl().should.match(/\/officer\/1\/bernadette-kelly\/$/);
  });

  it('should go to unit profile page when clicking on Unit row', function () {
    trrPage.officerSection.unitLinkItem.waitForVisible();
    trrPage.officerSection.unitLinkItem.click();

    browser.getUrl().should.match(/\/unit\/001\/$/);
  });

  it('should show request document modal when clicks on "Request Document"', function () {
    trrPage.trrInfoSection.documentRequestButton.click();
    trrPage.documentRequestModal.emailInput.waitForVisible();
  });

  it('should accept valid email, and close modal after 1.5s', function () {
    trrPage.trrInfoSection.documentRequestButton.click();
    trrPage.documentRequestModal.emailInput.waitForVisible();
    trrPage.documentRequestModal.emailInput.setValue('valid@email.com');
    trrPage.documentRequestModal.submitButton.click();
    trrPage.documentRequestModal.messageBox.waitForVisible();
    trrPage.documentRequestModal.messageBox.getText().should.equal('Thanks for subscribing.');
    browser.waitForVisible('.generic-modal-content', 2000, true);
    trrPage.trrInfoSection.documentRequestButton.getText().should.equal('Documents Requested   ✔');
  });

  it('should ignore invalid email', function () {
    trrPage.trrInfoSection.documentRequestButton.click();
    trrPage.documentRequestModal.emailInput.waitForVisible();
    trrPage.documentRequestModal.emailInput.setValue('invalid@email.com');
    trrPage.documentRequestModal.submitButton.click();
    trrPage.documentRequestModal.messageBox.waitForVisible();
    trrPage.documentRequestModal.messageBox.getText().should.equal('Sorry, we can not subscribe your email');
  });
});
