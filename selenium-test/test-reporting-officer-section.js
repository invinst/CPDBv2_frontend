'use strict';

require('should');

import reportingPage from './page-objects/reporting-page';


function addOfficerCard() {
  reportingPage.bottomSheet.officerSection.officerAddBlock.officerAutoSuggest.input.setValue('foo');
  reportingPage.bottomSheet.officerSection.officerAddBlock.officerAutoSuggest.suggestion.click();
  reportingPage.bottomSheet.officerSection.officerAddBlock.addButton.click();
}

describe('bottom-sheet', function () {

  beforeEach(function () {
    reportingPage.open();
  });

  context('edit mode off', function () {
    it('should show officer involved and officer cards', function () {
      reportingPage.reportingSection.report.waitForVisible();
      reportingPage.reportingSection.report.click();

      reportingPage.bottomSheet.officerSection.officerInvolved.waitForVisible();
      reportingPage.bottomSheet.officerSection.officerCard.name.waitForVisible();
      reportingPage.bottomSheet.officerSection.officerCard.indicator.waitForVisible();
      reportingPage.bottomSheet.officerSection.officerCard.removeButton.waitForVisible(20000, true);
    });

    it('should navigate to officer page when we click on officer card', function () {
      reportingPage.reportingSection.report.waitForVisible();
      reportingPage.reportingSection.report.click();

      reportingPage.bottomSheet.officerSection.officerCard.element.waitForVisible();
      reportingPage.bottomSheet.officerSection.officerCard.element.click();
      browser.getUrl().should.match(/.+\/officer\/1\/$/);
    });
  });

  context('edit mode on', function () {
    beforeEach(function () {
      reportingPage.openEditMode();
    });

    it('should show add officer button if officers does not exists', function () {
      reportingPage.reportingSection.secondReport.click();
      reportingPage.bottomSheet.officerSection.addOfficerButton.waitForVisible();
      reportingPage.bottomSheet.officerSection.officerInvolved.waitForVisible(20000, true);
    });

    it('should show officer involved and officer cards if officers exists', function () {
      reportingPage.reportingSection.report.click();
      reportingPage.bottomSheet.officerSection.officerInvolved.waitForVisible();
      reportingPage.bottomSheet.officerSection.officerCard.name.waitForVisible();
      reportingPage.bottomSheet.officerSection.officerCard.removeButton.waitForVisible();
      reportingPage.bottomSheet.officerSection.officerCard.indicator.waitForVisible(20000, true);
    });

    it('should show add officer block when we click on add officer button', function () {
      reportingPage.reportingSection.secondReport.click();
      reportingPage.bottomSheet.officerSection.addOfficerButton.waitForVisible();
      reportingPage.bottomSheet.officerSection.addOfficerButton.click();
      reportingPage.bottomSheet.officerSection.officerAddBlock.addButton.waitForVisible();
    });

    it('should show add officer block when we click on add officer circle button', function () {
      reportingPage.reportingSection.report.click();
      reportingPage.bottomSheet.officerSection.circleAddOfficerButton.waitForVisible();
      reportingPage.bottomSheet.officerSection.circleAddOfficerButton.click();
      reportingPage.bottomSheet.officerSection.officerAddBlock.addButton.waitForVisible();
    });

    it('should show "No match found" if there is no suggested officer', function () {
      reportingPage.reportingSection.report.click();
      reportingPage.bottomSheet.officerSection.circleAddOfficerButton.waitForVisible();
      reportingPage.bottomSheet.officerSection.circleAddOfficerButton.click();
      reportingPage.bottomSheet.officerSection.officerAddBlock.officerAutoSuggest.input.setValue('notfound');
      reportingPage.bottomSheet.officerSection.officerAddBlock.officerAutoSuggest.noMatchFound.waitForVisible();
    });

    it('should show list of suggested officers when we type in input', function () {
      reportingPage.reportingSection.report.click();
      reportingPage.bottomSheet.officerSection.circleAddOfficerButton.waitForVisible();
      reportingPage.bottomSheet.officerSection.circleAddOfficerButton.click();
      reportingPage.bottomSheet.officerSection.officerAddBlock.officerAutoSuggest.input.waitForVisible();
      reportingPage.bottomSheet.officerSection.officerAddBlock.officerAutoSuggest.input.setValue('foo');

      reportingPage.bottomSheet.officerSection.officerAddBlock.officerAutoSuggest.suggestion.waitForVisible();
    });

    it('should close add officer block when we click on Cancel button', function () {
      reportingPage.reportingSection.report.click();
      reportingPage.bottomSheet.officerSection.circleAddOfficerButton.waitForVisible();
      reportingPage.bottomSheet.officerSection.circleAddOfficerButton.click();
      reportingPage.bottomSheet.officerSection.officerAddBlock.cancelButton.waitForVisible();
      reportingPage.bottomSheet.officerSection.officerAddBlock.cancelButton.click();
      reportingPage.bottomSheet.officerSection.officerAddBlock.addButton.waitForVisible(20000, true);
    });

    it('should update list of officer cards when we select a suggested officer and click add button', function () {
      reportingPage.reportingSection.secondReport.click();
      reportingPage.bottomSheet.officerSection.addOfficerButton.waitForVisible();
      reportingPage.bottomSheet.officerSection.addOfficerButton.click();
      addOfficerCard();
      reportingPage.bottomSheet.officerSection.officerCard.name.waitForVisible();
    });

    it('should update list of officer cards when we remove an officer', function () {
      reportingPage.reportingSection.report.click();
      reportingPage.bottomSheet.officerSection.officerCard.removeButton.waitForVisible();
      reportingPage.bottomSheet.officerSection.officerCard.removeButton.click();
      reportingPage.bottomSheet.officerSection.officerCard.name.waitForVisible(20000, true);
    });

    it('should not remove existing officer card when searching for new one', function () {
      reportingPage.reportingSection.secondReport.click();

      reportingPage.bottomSheet.officerSection.addOfficerButton.waitForVisible();
      reportingPage.bottomSheet.officerSection.addOfficerButton.click();
      addOfficerCard();

      reportingPage.bottomSheet.officerSection.circleAddOfficerButton.waitForVisible();
      reportingPage.bottomSheet.officerSection.circleAddOfficerButton.click();
      addOfficerCard();

      reportingPage.bottomSheet.officerSection.officerCard.name.count.should.eql(2);
    });
  });
});
