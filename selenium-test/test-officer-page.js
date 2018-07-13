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
    officerPage.summarySection.rankExtraInfo.getText().should.containEql('$100,000 base salary');

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
    officerPage.tabbedPaneSection.timelineSection.header.getText().should.containEql('RANK');
    officerPage.tabbedPaneSection.timelineSection.header.getText().should.containEql('UNIT');
    officerPage.tabbedPaneSection.timelineSection.header.getText().should.containEql('SHOWING');
    officerPage.tabbedPaneSection.timelineSection.header.getText().should.containEql('ALL EVENTS');
    officerPage.tabbedPaneSection.timelineSection.header.getText().should.containEql('DATE');

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

    it('should open radar chart explainer when being clicked and closeable', function () {
      officerPage.radarChartSection.radarChartPlaceHolder.click();

      officerPage.radarChartSection.explainerSection.leftNavigation.waitForVisible();

      officerPage.radarChartSection.explainerSection.closeExplainerButton.click();

      officerPage.radarChartSection.explainerSection.leftNavigation.waitForVisible(10000, true);
    });

    describe('Radar Chart Explainer', function () {
      it('should navigate correctly between explainers when clicking on left and right navigations', function () {
        officerPage.radarChartSection.radarChartPlaceHolder.click();

        officerPage.radarChartSection.explainerSection.triangleExplainer.waitForVisible();
        officerPage.radarChartSection.explainerSection.leftNavigation.getText().should.eql('Percentiles by year');
        officerPage.radarChartSection.explainerSection.rightNavigation.getText().should.eql('What is the scale?');

        officerPage.radarChartSection.explainerSection.leftNavigation.click();

        officerPage.radarChartSection.explainerSection.percentileByYear.waitForVisible();
        officerPage.radarChartSection.explainerSection.leftNavigation.getText().should.eql('What is the scale?');
        officerPage.radarChartSection.explainerSection.rightNavigation.getText().should.eql('What is this triangle?');

        officerPage.radarChartSection.explainerSection.leftNavigation.click();

        officerPage.radarChartSection.explainerSection.scaleExplainer.waitForVisible();
        officerPage.radarChartSection.explainerSection.leftNavigation.getText().should.eql('What is this triangle?');
        officerPage.radarChartSection.explainerSection.rightNavigation.getText().should.eql('Percentiles by year');

        officerPage.radarChartSection.explainerSection.leftNavigation.click();

        officerPage.radarChartSection.explainerSection.triangleExplainer.waitForVisible();
        officerPage.radarChartSection.explainerSection.leftNavigation.getText().should.eql('Percentiles by year');
        officerPage.radarChartSection.explainerSection.rightNavigation.getText().should.eql('What is the scale?');

        officerPage.radarChartSection.explainerSection.rightNavigation.click();

        officerPage.radarChartSection.explainerSection.scaleExplainer.waitForVisible();
        officerPage.radarChartSection.explainerSection.leftNavigation.getText().should.eql('What is this triangle?');
        officerPage.radarChartSection.explainerSection.rightNavigation.getText().should.eql('Percentiles by year');

        officerPage.radarChartSection.explainerSection.rightNavigation.click();

        officerPage.radarChartSection.explainerSection.percentileByYear.waitForVisible();
        officerPage.radarChartSection.explainerSection.leftNavigation.getText().should.eql('What is the scale?');
        officerPage.radarChartSection.explainerSection.rightNavigation.getText().should.eql('What is this triangle?');

        officerPage.radarChartSection.explainerSection.rightNavigation.click();

        officerPage.radarChartSection.explainerSection.triangleExplainer.waitForVisible();
        officerPage.radarChartSection.explainerSection.leftNavigation.getText().should.eql('Percentiles by year');
        officerPage.radarChartSection.explainerSection.rightNavigation.getText().should.eql('What is the scale?');
      });

      it('should hide word "Reports" if screen is too small', function () {
        officerPage.radarChartSection.radarChartPlaceHolder.click();
        officerPage.radarChartSection.explainerSection.leftNavigation.click();

        const percentileByYear = officerPage.radarChartSection.explainerSection.percentileByYear;

        percentileByYear.getText().should.containEql('Use Of Force\nReports');

        browser.setViewportSize({
          width: 800,
          height: 500
        });

        percentileByYear.getText().should.containEql('Use Of Force');
        percentileByYear.getText().should.not.containEql('Reports');
      });

      it('should hide explainer if screen is too small', function () {
        officerPage.radarChartSection.radarChartPlaceHolder.click();

        officerPage.radarChartSection.explainerSection.triangleExplainer.waitForVisible();

        browser.setViewportSize({
          width: 700,
          height: 500
        });

        officerPage.radarChartSection.explainerSection.triangleExplainer.waitForVisible(2000, true);
      });
    });
  });

  describe('Timeline', function () {
    it('should go to cr page when clicking on an cr timeline item', function () {
      officerPage.tabbedPaneSection.timelineSection.crItem.waitForVisible();
      officerPage.tabbedPaneSection.timelineSection.crItem.click();

      browser.getUrl().should.match(/\/complaint\/\w+\/$/);
    });

    it('should go to attachment source page when clicking on the attachment thumbnail', function () {
      officerPage.tabbedPaneSection.timelineSection.attachmentThumbnail.waitForVisible();
      officerPage.tabbedPaneSection.timelineSection.attachmentThumbnail.click();
      const tabIds = browser.getTabIds();
      browser.switchTab(tabIds[tabIds.length - 1]).pause(2000);
      browser.getUrl().should.eql('https://www.documentcloud.org/documents/3518950-CRID-294088-CR.html');
    });

    it('should go to attachment tab when clicking on the more attachment', function () {
      officerPage.tabbedPaneSection.timelineSection.moreAttachment.waitForVisible();
      officerPage.tabbedPaneSection.timelineSection.moreAttachment.click();
      officerPage.tabbedPaneSection.attachmentsSection.attachmentComplaint.waitForVisible();
    });

    it('should go to trr page when clicking on an trr timeline item', function () {
      officerPage.tabbedPaneSection.timelineSection.trrItem.waitForVisible();
      officerPage.tabbedPaneSection.timelineSection.trrItem.click();

      browser.getUrl().should.match(/\/trr\/\d+\/$/);
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

      it('should filter all events by by default', function () {
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

  describe('Attachments', function () {
    beforeEach(function () {
      officerPage.tabbedPaneSection.attachmentsTabName.click();
    });

    it('should go to complaint page when clicking on the complaint heading', function () {
      officerPage.tabbedPaneSection.attachmentsSection.attachmentComplaint.waitForVisible();
      officerPage.tabbedPaneSection.attachmentsSection.attachmentHeading.click();
      browser.getUrl().should.match(/\/complaint\/294088\/$/);
    });

    it('should go to attachment source page when clicking on the complaint attachment', function () {
      officerPage.tabbedPaneSection.attachmentsSection.attachmentComplaint.waitForVisible();
      officerPage.tabbedPaneSection.attachmentsSection.attachment.click();
      const tabIds = browser.getTabIds();
      browser.switchTab(tabIds[tabIds.length - 1]).pause(2000);
      browser.getUrl().should.eql('https://www.documentcloud.org/documents/3518950-CRID-294088-CR.html');
    });
  });
});
