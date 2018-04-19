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
    summaryPage.tabbedPaneSection.menu.waitForVisible();

    summaryPage.tabbedPaneSection.menu.getText().should.eql('TIMELINESUMMARYMAPCOACCUSALSATTACHMENTS');
    summaryPage.tabbedPaneSection.timelineTabName.getCssProperty('background-color').value.should.eql(
      'rgba(0,94,244,1)'
    );
    // Due to float right, we need to add a '\n' here
    summaryPage.tabbedPaneSection.timelineSection.header.getText().should.eql('RANKUNITSHOWINGALL EVENTS\nDATE');

    summaryPage.tabbedPaneSection.timelineSection.crItem.waitForVisible();
    summaryPage.tabbedPaneSection.timelineSection.trrItem.waitForVisible();
    summaryPage.tabbedPaneSection.timelineSection.awardItem.waitForVisible();
    summaryPage.tabbedPaneSection.timelineSection.unitChangeItem.waitForVisible();
    summaryPage.tabbedPaneSection.timelineSection.joinedItem.waitForVisible();
    summaryPage.tabbedPaneSection.timelineSection.yearItem.waitForVisible();
    summaryPage.tabbedPaneSection.timelineSection.emptyItem.waitForVisible();
  });

  it('should change tab when click on tab name', function () {
    summaryPage.tabbedPaneSection.menu.waitForVisible();
    summaryPage.tabbedPaneSection.timelineSection.header.waitForVisible();

    summaryPage.tabbedPaneSection.summaryTabName.click();

    summaryPage.tabbedPaneSection.timelineSection.header.waitForVisible(10000, true);
    summaryPage.tabbedPaneSection.coaccusalsSection.firstCoaccusalGroupName.waitForVisible(10000, true);

    summaryPage.tabbedPaneSection.coaccusalsTabName.click();

    summaryPage.tabbedPaneSection.timelineSection.header.waitForVisible(10000, true);
    summaryPage.tabbedPaneSection.coaccusalsSection.firstCoaccusalGroupName.waitForVisible();
    summaryPage.tabbedPaneSection.coaccusalsSection.firstCoaccusalCard.waitForVisible();
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

  describe('Timeline filter', function () {
    beforeEach(function () {
      summaryPage.tabbedPaneSection.timelineSection.filter.button.waitForVisible();
      summaryPage.tabbedPaneSection.timelineSection.filter.button.click();
    });

    afterEach(function () {
      summaryPage.tabbedPaneSection.timelineSection.unitChangeItem.waitForVisible();
      summaryPage.tabbedPaneSection.timelineSection.joinedItem.waitForVisible();
      summaryPage.tabbedPaneSection.timelineSection.yearItem.waitForVisible();
      summaryPage.tabbedPaneSection.timelineSection.emptyItem.waitForVisible();
    });

    it('should filter all events', function () {
      summaryPage.tabbedPaneSection.timelineSection.filter.all.click();

      summaryPage.tabbedPaneSection.timelineSection.crItem.waitForVisible();
      summaryPage.tabbedPaneSection.timelineSection.trrItem.waitForVisible();
      summaryPage.tabbedPaneSection.timelineSection.awardItem.waitForVisible();
    });

    it('should filter complaints', function () {
      summaryPage.tabbedPaneSection.timelineSection.filter.crs.click();

      summaryPage.tabbedPaneSection.timelineSection.crItem.waitForVisible();
      summaryPage.tabbedPaneSection.timelineSection.trrItem.waitForVisible(1000, true);
      summaryPage.tabbedPaneSection.timelineSection.awardItem.waitForVisible(1000, true);
    });

    it('should filter TRRs', function () {
      summaryPage.tabbedPaneSection.timelineSection.filter.force.click();

      summaryPage.tabbedPaneSection.timelineSection.crItem.waitForVisible(1000, true);
      summaryPage.tabbedPaneSection.timelineSection.trrItem.waitForVisible();
      summaryPage.tabbedPaneSection.timelineSection.awardItem.waitForVisible(1000, true);
    });

    it('should filter awards', function () {
      summaryPage.tabbedPaneSection.timelineSection.filter.awards.click();

      summaryPage.tabbedPaneSection.timelineSection.crItem.waitForVisible(1000, true);
      summaryPage.tabbedPaneSection.timelineSection.trrItem.waitForVisible(1000, true);
      summaryPage.tabbedPaneSection.timelineSection.awardItem.waitForVisible();
    });

    it('should close the menu when blurring', function () {
      summaryPage.tabbedPaneSection.timelineSection.crItem.click();
      summaryPage.tabbedPaneSection.timelineSection.filter.menu.waitForVisible(1000, true);
    });
  });

  describe('Coaccusals', function () {
    it('should navigate to officer page when clicking on a CoaccusalCard', function () {
      summaryPage.tabbedPaneSection.timelineSection.header.waitForVisible();

      browser.getUrl().should.match(/\/officer\/1\/$/);

      summaryPage.tabbedPaneSection.coaccusalsTabName.click();
      summaryPage.tabbedPaneSection.coaccusalsSection.firstCoaccusalGroupName.waitForVisible();
      summaryPage.tabbedPaneSection.coaccusalsSection.firstCoaccusalCard.click();

      browser.getUrl().should.match(/\/officer\/2\/$/);
    });
  });
});
