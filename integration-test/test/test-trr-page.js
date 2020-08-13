'use strict';


require('should');

import trrPage from '../page-objects/trr-page';
import { mockCommonApi } from '../mock-data/utils';
import api from '../mock-api';
import { trrData } from '../mock-data/trr-page';
import { officerData } from '../mock-data/officer-page/common';


describe('TRR page', function () {
  beforeEach(function () {
    mockCommonApi();

    api.onGet('/api/v2/trr/1/').reply(200, trrData);
    api.onGet('/api/v2/officers/1/summary/').reply(200, officerData);
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
    api.onGet('/api/v2/officers/1/summary/').reply(200, officerData);
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
    api.onPost('/api/v2/trr/1/request-document/', { email: 'valid@email.com' })
      .reply(200, { 'message': 'Thanks for subscribing.', 'trr_id': 1 });

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
    api.onPost('/api/v2/trr/1/request-document/', { email: 'invalid@email.com' })
      .reply(400, { 'message': 'Sorry, we can not subscribe your email' });

    trrPage.trrInfoSection.documentRequestButton.click();
    trrPage.documentRequestModal.emailInput.waitForDisplayed();
    trrPage.documentRequestModal.emailInput.setValue('invalid@email.com');
    trrPage.documentRequestModal.submitButton.click();
    trrPage.documentRequestModal.messageBox.waitForDisplayed();
    trrPage.documentRequestModal.messageBox.getText().should.equal('Sorry, we can not subscribe your email');
  });
});
