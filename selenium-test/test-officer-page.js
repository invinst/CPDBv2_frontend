'use strict';

require('should');

import officerPage from './page-objects/officer-page';
import { selectText, switchToRecentTab } from './utils';

const noDataRadarChartOfficerId = 2;


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

    const tabbedPaneMenuText = officerPage.tabbedPaneSection.menu.getText();
    tabbedPaneMenuText.should.containEql('TIMELINE');
    tabbedPaneMenuText.should.containEql('MAP');
    tabbedPaneMenuText.should.containEql('COACCUSALS');
    tabbedPaneMenuText.should.containEql('ATTACHMENTS');

    officerPage.tabbedPaneSection.timelineTabName.getCssProperty('background-color').value.should.eql(
      'rgba(0,94,244,1)'
    );

    const headerText = officerPage.tabbedPaneSection.timelineSection.header.getText();
    headerText.should.containEql('RANK');
    headerText.should.containEql('UNIT');
    headerText.should.containEql('SHOWING');
    headerText.should.containEql('ALL EVENTS');
    headerText.should.containEql('DATE');

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

    context('not enough data for radar chart', function () {
      beforeEach(function () {
        browser.setViewportSize({
          width: 1000,
          height: 500
        });
        officerPage.open(noDataRadarChartOfficerId);
      });

      it('should show NoDataRadarChart', function () {
        officerPage.radarChartSection.noDataRadarChartSection.component.waitForVisible();
        officerPage.radarChartSection.noDataRadarChartSection.noDataText.getText().should.eql('no data explain text');
      });

      it('should not open radar chart explainer when being clicked', function () {
        officerPage.radarChartSection.noDataRadarChartSection.component.waitForVisible();
        officerPage.radarChartSection.radarChartPlaceHolder.waitForVisible(2000, true);

        officerPage.radarChartSection.noDataRadarChartSection.component.click();
        officerPage.radarChartSection.component.click();
        officerPage.radarChartSection.explainerSection.component.waitForVisible(10000, true);
      });
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
      switchToRecentTab();
      browser.getUrl().should.eql('https://www.documentcloud.org/documents/3518950-CRID-294088-CR.html');
    });
  });

  describe('Officer CMS text editor', function () {
    context('no data radar chart', function () {
      beforeEach(function () {
        officerPage.open(noDataRadarChartOfficerId);
        officerPage.openEditMode();
        browser.moveToObject(officerPage.radarChartSection.noDataRadarChartSection.noDataText.selector);
        officerPage.radarChartSection.noDataRadarChartSection.editButton.click();
      });

      it('should be editable', function () {
        selectText(officerPage.radarChartSection.noDataRadarChartSection.noDataText.selector);
        browser.keys('No Data Text');
        officerPage.radarChartSection.noDataRadarChartSection.noDataText.getText().should.containEql('No Data Text');
      });
    });

    context('triangle & scale explainer', function () {
      beforeEach(function () {
        officerPage.open();
        officerPage.openEditMode();
        officerPage.radarChartSection.radarChartPlaceHolder.click();
      });

      it('should be editable', function () {
        browser.moveToObject(officerPage.radarChartSection.explainerSection.triangleExplainerText.selector);
        officerPage.radarChartSection.explainerSection.triangleEditButton.click();

        const triangleExplainerText = officerPage.radarChartSection.explainerSection.triangleExplainerText;
        selectText(triangleExplainerText.selector);
        browser.keys('triangle explain updated');
        triangleExplainerText.getText().should.containEql('triangle explain updated');

        const triangleExplainerSubText = officerPage.radarChartSection.explainerSection.triangleExplainerSubText;
        selectText(triangleExplainerSubText.selector);
        browser.keys('triangle explain sub updated');
        triangleExplainerSubText.getText().should.containEql('triangle explain sub updated');


        officerPage.radarChartSection.explainerSection.rightNavigation.click();
        browser.moveToObject(officerPage.radarChartSection.explainerSection.scaleExplainerText.selector);
        officerPage.radarChartSection.explainerSection.scaleEditButton.click();

        const scaleExplainerText = officerPage.radarChartSection.explainerSection.scaleExplainerText;
        selectText(scaleExplainerText.selector);
        browser.keys('scale explain updated');
        scaleExplainerText.getText().should.containEql('scale explain updated');

        const scaleExplainerSubText = officerPage.radarChartSection.explainerSection.scaleExplainerSubText;
        selectText(scaleExplainerSubText.selector);
        browser.keys('scale explain sub updated');
        scaleExplainerSubText.getText().should.containEql('scale explain sub updated');
      });
    });
  });
});
