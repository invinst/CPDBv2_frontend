'use strict';

require('should');

import crPage from '../page-objects/cr-page';
import officerPage from '../page-objects/officer-page';
import api from '../mock-api';
import { crData, crPopupData } from '../mock-data/cr-page/common';
import { officerData } from '../mock-data/officer-page/common';


describe('Popup', function () {
  describe('CR Page popup', function () {
    beforeEach(function () {
      api.onGet('/api/v2/cr/1000000/').reply(200, crData);
      api.onGet('/api/v2/popup/', { page: 'complaint' }).reply(200, crPopupData);
      crPage.open();
    });

    it('should appear when clicking on the button', function () {
      crPage.accusedOfficers.popupButton.click();
      crPage.accusedOfficers.popup.waitForDisplayed();
      crPage.accusedOfficers.popupTitle.getText().should.equal('Accused Officer');
      crPage.accusedOfficers.popupText.getText().should.equal('Some accused officer explanation');
    });

    it('should close when clicking outside', function () {
      crPage.accusedOfficers.popupButton.click();
      crPage.accusedOfficers.popup.waitForDisplayed();
      $('body').click();
      crPage.accusedOfficers.popup.waitForDisplayed(1000, true);
    });

    it('should not close when clicking inside', function () {
      crPage.accusedOfficers.popupButton.click();
      crPage.accusedOfficers.popup.waitForDisplayed();
      crPage.accusedOfficers.popup.click();
      crPage.accusedOfficers.popup.waitForDisplayed();
    });

    it('should close when clicking on the close button', function () {
      crPage.accusedOfficers.popupButton.click();
      crPage.accusedOfficers.popup.waitForDisplayed();
      crPage.accusedOfficers.popupCloseButton.click();
      crPage.accusedOfficers.popup.waitForDisplayed(1000, true);
    });
  });

  describe('Officer Page popup', function () {
    beforeEach(function () {
      api.onGet('/api/v2/officers/1/summary/').reply(200, officerData);
      officerPage.open();
    });

    it('should close the previous popup when open new popup', function () {
      officerPage.tabbedPaneSection.timelineSection.rankPopupButton.click();
      officerPage.tabbedPaneSection.timelineSection.rankPopup.waitForDisplayed();
      officerPage.tabbedPaneSection.timelineSection.salaryPopupButton.click();
      officerPage.tabbedPaneSection.timelineSection.salaryPopup.waitForDisplayed();
      officerPage.tabbedPaneSection.timelineSection.rankPopup.waitForDisplayed(1000, true);
    });
  });
});
