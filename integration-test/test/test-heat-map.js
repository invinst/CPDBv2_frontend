'use strict';

import 'should';

import landingPage from '../page-objects/landing-page';
import { mockCommonApi, mockLandingPageApi } from '../mock-data/utils';


describe('Heat map', function () {
  beforeEach(function () {
    mockCommonApi();
    mockLandingPageApi();
    landingPage.open();
  });

  describe('summary panel', function () {
    it('should display city summary', function () {
      landingPage.heatMapSection.citySummary.header.getText().should.equal(
        'Citizens Police Data Project collects and publishes data about police misconduct in Chicago.'
      );
      landingPage.heatMapSection.citySummary.totalLawsuitSettlements.getText().should.equal('$10.0 million');
      landingPage.heatMapSection.citySummary.allegationCount.getText().should.equal('10');
      landingPage.heatMapSection.citySummary.allegationDisciplineCount.getText().should.equal('50%');
    });

    it('should go to v1 datatool when click on explore complaint data', function () {
      const v2Url = browser.getUrl();
      landingPage.pinboardIntroduction.body.waitForDisplayed();
      landingPage.pinboardIntroduction.closeButton.click();
      landingPage.heatMapSection.citySummary.exploreComplaintData.click();
      browser.switchWindow('cpdb');
      browser.getUrl().should.not.equal(v2Url);
      browser.closeWindow();
      browser.switchWindow('localhost');
    });
  });
});
