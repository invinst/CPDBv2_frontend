'use strict';

require('should');

import summaryPage from './page-objects/officer-summary-page';
import { getRequestCount } from './utils';


describe('officer summary page', function () {

  beforeEach(function () {
    browser.setViewportSize({
      width: 1000,
      height: 500
    });
    summaryPage.open();
  });

  afterEach(function () {
    browser.setViewportSize({
      width: 1000,
      height: 1000
    });
  });

  it('should highlight summary header button', function () {
    summaryPage.header.officerName.waitForVisible();
    summaryPage.header.activeButton.waitForVisible();
    browser.pause('5000');
    summaryPage.header.activeButton.getText().should.equal('Summary');
  });

  it('should display officer summary', function () {
    summaryPage.header.officerName.waitForVisible();
    summaryPage.header.officerName.getText().should.equal('Bernadette Kelly');

    summaryPage.summarySection.officerName.getText().should.eql('Bernadette Kelly');

    summaryPage.summarySection.yearOfBirthLabel.getText().should.equal('Year of Birth');
    summaryPage.summarySection.yearOfBirthValue.getText().should.equal('1963');
    summaryPage.summarySection.yearOfBirthExtraInfo.getText().should.equal('54 years old');

    summaryPage.summarySection.unitLabel.getText().should.equal('Unit');
    summaryPage.summarySection.unitValue.getText().should.equal('001');
    summaryPage.summarySection.unitExtraInfo.getText().should.equal('View Unit Profile');

    summaryPage.summarySection.careerLabel.getText().should.equal('Career');
    summaryPage.summarySection.careerValue.getText().should.equal('SEP 23, 2015—Present');

    summaryPage.summarySection.rankLabel.getText().should.equal('Rank');
    summaryPage.summarySection.rankValue.getText().should.equal('NA');
    summaryPage.summarySection.rankExtraInfo.getText().should.equal('DATA NOT READY base salary');

    summaryPage.summarySection.raceLabel.getText().should.equal('Race');
    summaryPage.summarySection.raceValue.getText().should.equal('White');

    summaryPage.summarySection.badgeLabel.getText().should.equal('Badge');
    summaryPage.summarySection.badgeValue.getText().should.equal('12345');

    summaryPage.summarySection.sexLabel.getText().should.equal('Sex');
    summaryPage.summarySection.sexValue.getText().should.equal('Male');
  });

  it('should not launch any request when click on Social tab', function () {
    summaryPage.header.socialButton.waitForVisible();
    summaryPage.header.socialButton.click();

    getRequestCount('/officers/1/social-graph/').should.equal(1);
    getRequestCount('/officers/1/summary/').should.equal(1);
  });

  it('should open unit profile page when clicking on View Unit Profile button', function () {
    summaryPage.summarySection.viewUnitProfileButton.click();

    browser.getUrl().should.match(/\/unit\/\d+\/$/);
  });

  it('should display the timeline by default', function () {
    summaryPage.biographySection.menu.waitForVisible();

    summaryPage.biographySection.menu.getText().should.eql('TIMELINESUMMARYMAPCOACCUSALSATTACHMENTS');
    summaryPage.biographySection.timelineTabName.getCssProperty('background-color').value.should.eql(
      'rgba(0,94,244,1)'
    );
    // Due to float right, we need to add a '\n' here
    summaryPage.biographySection.timelineSection.header.getText().should.eql('RANKUNITSHOWING\nDATE');

    summaryPage.biographySection.timelineSection.crItem.waitForVisible();
    summaryPage.biographySection.timelineSection.trrItem.waitForVisible();
    summaryPage.biographySection.timelineSection.awardItem.waitForVisible();
    summaryPage.biographySection.timelineSection.unitChangeItem.waitForVisible();
    summaryPage.biographySection.timelineSection.joinedItem.waitForVisible();
    summaryPage.biographySection.timelineSection.yearItem.waitForVisible();
    summaryPage.biographySection.timelineSection.emptyItem.waitForVisible();
  });

  describe('Radar Chart', function () {
    it('should responsive', function () {
      browser.setViewportSize({
        width: 300,
        height: 600
      });
      summaryPage.radarChartSection.lastAxisTitle.waitForVisible();
    });
  });
});
