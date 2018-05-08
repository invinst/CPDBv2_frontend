'use strict';

require('should');

import officerPage from './page-objects/officer-page';


describe('officer page', function () {

  beforeEach(function () {
    browser.setViewportSize({
      width: 1000,
      height: 500
    });
    officerPage.open();
  });

  afterEach(function () {
    browser.setViewportSize({
      width: 1000,
      height: 1000
    });
  });

  it('should display officer summary', function () {
    officerPage.summarySection.officerName.getText().should.eql('Bernadette Kelly');

    officerPage.summarySection.yearOfBirthLabel.getText().should.equal('Year of Birth');
    officerPage.summarySection.yearOfBirthValue.getText().should.equal('1963');
    officerPage.summarySection.yearOfBirthExtraInfo.getText().should.equal('54 years old');

    officerPage.summarySection.unitLabel.getText().should.equal('Unit');
    officerPage.summarySection.unitValue.getText().should.equal('District 001');
    officerPage.summarySection.unitExtraInfo.getText().should.equal('View Unit Profile');

    officerPage.summarySection.careerLabel.getText().should.equal('Career');
    officerPage.summarySection.careerValue.getText().should.equal('SEP 23, 2015—Present');

    officerPage.summarySection.rankLabel.getText().should.equal('Rank');
    officerPage.summarySection.rankValue.getText().should.equal('NA');
    officerPage.summarySection.rankExtraInfo.getText().should.equal('DATA NOT READY base salary');

    officerPage.summarySection.raceLabel.getText().should.equal('Race');
    officerPage.summarySection.raceValue.getText().should.equal('White');

    officerPage.summarySection.badgeLabel.getText().should.equal('Badge');
    officerPage.summarySection.badgeValue.getText().should.equal('12345');

    officerPage.summarySection.sexLabel.getText().should.equal('Sex');
    officerPage.summarySection.sexValue.getText().should.equal('Male');
  });

  it('should open unit profile page when clicking on View Unit Profile button', function () {
    officerPage.summarySection.viewUnitProfileButton.click();

    browser.getUrl().should.match(/\/unit\/\d+\/$/);
  });

  it('should display the timeline by default', function () {
    officerPage.tabbedPaneSection.menu.waitForVisible();

    officerPage.tabbedPaneSection.menu.getText().should.eql('TIMELINEMAPCOACCUSALSATTACHMENTS');
    officerPage.tabbedPaneSection.timelineTabName.getCssProperty('background-color').value.should.eql(
      'rgba(0,94,244,1)'
    );
    // Due to float right, we need to add a '\n' here
    officerPage.tabbedPaneSection.timelineSection.header.getText().should.eql('RANKUNITSHOWINGALL EVENTS\nDATE');

    officerPage.tabbedPaneSection.timelineSection.crItem.waitForVisible();
    officerPage.tabbedPaneSection.timelineSection.trrItem.waitForVisible();
    officerPage.tabbedPaneSection.timelineSection.awardItem.waitForVisible();
    officerPage.tabbedPaneSection.timelineSection.unitChangeItem.waitForVisible();
    officerPage.tabbedPaneSection.timelineSection.joinedItem.waitForVisible();
    officerPage.tabbedPaneSection.timelineSection.yearItem.waitForVisible();
    officerPage.tabbedPaneSection.timelineSection.emptyItem.waitForVisible();
  });

  it('should change tab when click on tab name', function () {
    officerPage.tabbedPaneSection.menu.waitForVisible();
    officerPage.tabbedPaneSection.timelineSection.header.waitForVisible();

    officerPage.tabbedPaneSection.mapTabName.click();

    officerPage.tabbedPaneSection.timelineSection.header.waitForVisible(10000, true);
    officerPage.tabbedPaneSection.coaccusalsSection.firstCoaccusalGroupName.waitForVisible(10000, true);

    officerPage.tabbedPaneSection.coaccusalsTabName.click();

    officerPage.tabbedPaneSection.timelineSection.header.waitForVisible(10000, true);
    officerPage.tabbedPaneSection.coaccusalsSection.firstCoaccusalGroupName.waitForVisible();
    officerPage.tabbedPaneSection.coaccusalsSection.firstCoaccusalCard.waitForVisible();
  });

  describe('Radar Chart', function () {
    it('should responsive', function () {
      browser.setViewportSize({
        width: 300,
        height: 600
      });
      officerPage.radarChartSection.lastAxisTitle.waitForVisible();
    });
  });

  describe('Timeline', function () {
    it('should go to cr page when clicking on an cr timeline item', function () {
      officerPage.tabbedPaneSection.timelineSection.crItem.waitForVisible();
      officerPage.tabbedPaneSection.timelineSection.crItem.click();

      browser.getUrl().should.match(/\/complaint\/\d+\/$/);
    });

    describe('Timeline filter', function () {
      beforeEach(function () {
        officerPage.tabbedPaneSection.timelineSection.filter.button.waitForVisible();
        officerPage.tabbedPaneSection.timelineSection.filter.button.click();
      });

      afterEach(function () {
        officerPage.tabbedPaneSection.timelineSection.unitChangeItem.waitForVisible();
        officerPage.tabbedPaneSection.timelineSection.joinedItem.waitForVisible();
        officerPage.tabbedPaneSection.timelineSection.yearItem.waitForVisible();
        officerPage.tabbedPaneSection.timelineSection.emptyItem.waitForVisible();
      });

      it('should filter all events', function () {
        officerPage.tabbedPaneSection.timelineSection.filter.all.click();

        officerPage.tabbedPaneSection.timelineSection.crItem.waitForVisible();
        officerPage.tabbedPaneSection.timelineSection.trrItem.waitForVisible();
        officerPage.tabbedPaneSection.timelineSection.awardItem.waitForVisible();
      });

      it('should filter complaints', function () {
        officerPage.tabbedPaneSection.timelineSection.filter.crs.click();

        officerPage.tabbedPaneSection.timelineSection.crItem.waitForVisible();
        officerPage.tabbedPaneSection.timelineSection.trrItem.waitForVisible(1000, true);
        officerPage.tabbedPaneSection.timelineSection.awardItem.waitForVisible(1000, true);
      });

      it('should filter TRRs', function () {
        officerPage.tabbedPaneSection.timelineSection.filter.force.click();

        officerPage.tabbedPaneSection.timelineSection.crItem.waitForVisible(1000, true);
        officerPage.tabbedPaneSection.timelineSection.trrItem.waitForVisible();
        officerPage.tabbedPaneSection.timelineSection.awardItem.waitForVisible(1000, true);
      });

      it('should filter awards', function () {
        officerPage.tabbedPaneSection.timelineSection.filter.awards.click();

        officerPage.tabbedPaneSection.timelineSection.crItem.waitForVisible(1000, true);
        officerPage.tabbedPaneSection.timelineSection.trrItem.waitForVisible(1000, true);
        officerPage.tabbedPaneSection.timelineSection.awardItem.waitForVisible();
      });

      it('should close the menu when blurring', function () {
        officerPage.tabbedPaneSection.timelineSection.yearItem.click();
        officerPage.tabbedPaneSection.timelineSection.filter.menu.waitForVisible(1000, true);
      });
    });
  });

  describe('Coaccusals', function () {
    it('should navigate to officer page when clicking on a CoaccusalCard', function () {
      officerPage.tabbedPaneSection.timelineSection.header.waitForVisible();

      browser.getUrl().should.match(/\/officer\/1\/$/);

      officerPage.tabbedPaneSection.coaccusalsTabName.click();
      officerPage.tabbedPaneSection.coaccusalsSection.firstCoaccusalGroupName.waitForVisible();
      officerPage.tabbedPaneSection.coaccusalsSection.firstCoaccusalCard.click();

      browser.getUrl().should.match(/\/officer\/2\/$/);
    });
  });
});
