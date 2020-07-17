'use strict';


require('should');

import trrPage from '../page-objects/trr-page';


describe('TRR page', function () {
  beforeEach(function () {
    trrPage.open();
  });

  it('should display officer section', function () {
    trrPage.title.waitForDisplayed();

    trrPage.title.getText().should.equal('TRR 1');
    trrPage.officerSection.officerName.getText().should.equal('Bernadette Kelly');
    trrPage.officerSection.radarChart
      .getCSSProperty('background-color').value.should.eql('rgba(245,37,36,1)');
  });


  it('should go to officer profile page when clicking on the Officer Row', function () {
    trrPage.officerSection.officerRow.waitForDisplayed();
    trrPage.officerSection.officerRow.click();

    browser.getUrl().should.match(/\/officer\/1\/bernadette-kelly\/$/);
  });

  it('should go to unit profile page when clicking on Unit row', function () {
    trrPage.officerSection.unitLinkItem.waitForDisplayed();
    trrPage.officerSection.unitLinkItem.click();

    browser.getUrl().should.match(/\/unit\/001\/$/);
  });

  it('should show request document modal when clicks on "Request Document"', function () {
    trrPage.trrInfoSection.documentRequestButton.click();
    trrPage.documentRequestModal.emailInput.waitForDisplayed();
  });

  it('should accept valid email, and close modal after 1.5s', function () {
    trrPage.trrInfoSection.documentRequestButton.click();
    trrPage.documentRequestModal.emailInput.waitForDisplayed();
    trrPage.documentRequestModal.emailInput.setValue('valid@email.com');
    trrPage.documentRequestModal.submitButton.click();
    trrPage.documentRequestModal.messageBox.waitForDisplayed();
    trrPage.documentRequestModal.messageBox.getText().should.equal('Thanks for subscribing.');
    trrPage.documentRequestModal.content.waitForDisplayed(2000, true);
    trrPage.trrInfoSection.documentRequestButton.getText().should.equal('Documents Requested   ✔');
  });

  it('should ignore invalid email', function () {
    trrPage.trrInfoSection.documentRequestButton.click();
    trrPage.documentRequestModal.emailInput.waitForDisplayed();
    trrPage.documentRequestModal.emailInput.setValue('invalid@email.com');
    trrPage.documentRequestModal.submitButton.click();
    trrPage.documentRequestModal.messageBox.waitForDisplayed();
    trrPage.documentRequestModal.messageBox.getText().should.equal('Sorry, we can not subscribe your email');
  });
});
