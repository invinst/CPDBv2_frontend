'use strict';


require('should');

import officerPage from './page-objects/officer-page';
import header from './page-objects/shareable-header';
import landingPage from './page-objects/landing-page';
import searchPage from './page-objects/search-page';
import pinboardPage from './page-objects/pinboard-page';
import { setupMockApiFile, restoreMockApiFile, selectText } from './utils';

const noDataRadarChartOfficerId = 2;

function showingComplaints(officerPage) {
  officerPage.tabbedPaneSection.timelineSection.filter.button.getText().should.containEql('Complaints');
  officerPage.tabbedPaneSection.timelineSection.crItem.waitForDisplayed();
  officerPage.tabbedPaneSection.timelineSection.crItem.count.should.eql(2);
  officerPage.tabbedPaneSection.timelineSection.trrItem.waitForDisplayed(1000, true);
  officerPage.tabbedPaneSection.timelineSection.awardItem.waitForDisplayed(1000, true);
  return true;
}

function showingAllEvents(officerPage) {
  officerPage.tabbedPaneSection.timelineSection.filter.button.getText().should.containEql('All');
  officerPage.tabbedPaneSection.timelineSection.crItem.waitForDisplayed();
  officerPage.tabbedPaneSection.timelineSection.trrItem.waitForDisplayed();
  officerPage.tabbedPaneSection.timelineSection.awardItem.waitForDisplayed();
  return true;
}

describe('officer page', function () {

  beforeEach(function () {
    officerPage.open();
  });

  afterEach(function () {
    browser.setWindowRect(0, 0, 1000, 1000);
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
    officerPage.summarySection.careerValue.getText().should.equal('SEP 23, 2015 — Present');

    officerPage.summarySection.rankLabel.getText().should.equal('Rank');
    officerPage.summarySection.rankValue.getText().should.equal('Police Officer');
    officerPage.summarySection.rankExtraInfo.getText().should.containEql('$100,000 base salary');

    officerPage.summarySection.raceLabel.getText().should.equal('Race');
    officerPage.summarySection.raceValue.getText().should.equal('White');

    officerPage.summarySection.badgeLabel.getText().should.equal('Badge');
    officerPage.summarySection.badgeValue.getText().should.equal('12345, 54321, 56789');

    officerPage.summarySection.sexLabel.getText().should.equal('Sex');
    officerPage.summarySection.sexValue.getText().should.equal('Male');
  });

  it('should open unit profile page when clicking on View Unit Profile button', function () {
    officerPage.summarySection.viewUnitProfileButton.click();

    browser.getUrl().should.match(/\/unit\/\d+\/$/);
  });

  it('should display the timeline by default', function () {
    officerPage.tabbedPaneSection.menu.waitForDisplayed();

    const tabbedPaneMenuText = officerPage.tabbedPaneSection.menu.getText();
    tabbedPaneMenuText.should.containEql('TIMELINE');
    tabbedPaneMenuText.should.containEql('MAP');
    tabbedPaneMenuText.should.containEql('COACCUSALS');
    tabbedPaneMenuText.should.containEql('DOCUMENTS');

    officerPage.tabbedPaneSection.timelineTabName.getAttribute('class').should.containEql('active');

    const headerText = officerPage.tabbedPaneSection.timelineSection.header.getText();
    headerText.should.containEql('RANK');
    headerText.should.containEql('UNIT');
    headerText.should.containEql('SHOWING');
    headerText.should.containEql('All');
    headerText.should.containEql('DATE');

    officerPage.tabbedPaneSection.timelineSection.crItem.waitForDisplayed();
    officerPage.tabbedPaneSection.timelineSection.trrItem.waitForDisplayed();
    officerPage.tabbedPaneSection.timelineSection.awardItem.waitForDisplayed();
    officerPage.tabbedPaneSection.timelineSection.unitChangeItem.waitForDisplayed();
    officerPage.tabbedPaneSection.timelineSection.joinedItem.waitForDisplayed();
    officerPage.tabbedPaneSection.timelineSection.yearItem.waitForDisplayed();
    officerPage.tabbedPaneSection.timelineSection.emptyItem.waitForDisplayed();
  });

  it('should change tab when click on tab name', function () {
    officerPage.tabbedPaneSection.menu.waitForDisplayed();
    officerPage.tabbedPaneSection.timelineSection.header.waitForDisplayed();

    officerPage.tabbedPaneSection.mapTabName.click();

    officerPage.tabbedPaneSection.timelineSection.header.waitForDisplayed(10000, true);
    officerPage.tabbedPaneSection.coaccusalsSection.firstCoaccusalGroupName.waitForDisplayed(10000, true);

    officerPage.tabbedPaneSection.coaccusalsTabName.click();

    officerPage.tabbedPaneSection.timelineSection.header.waitForDisplayed(10000, true);
    officerPage.tabbedPaneSection.coaccusalsSection.firstCoaccusalGroupName.waitForDisplayed();
    officerPage.tabbedPaneSection.coaccusalsSection.firstCoaccusalCard.waitForDisplayed();
  });

  it('should redirect to correct path name when only officer id is provided', function () {
    officerPage.open(1);
    officerPage.summarySection.officerName.waitForDisplayed();
    browser.getUrl().should.match(/\/officer\/1\/bernadette-kelly\/?$/);
  });

  it('should redirect to correct path name when the officer name is incorrect', function () {
    browser.url('/officer/1/somethingwrong/');
    officerPage.summarySection.officerName.waitForDisplayed();
    browser.getUrl().should.match(/\/officer\/1\/bernadette-kelly\/?$/);
  });

  describe('Radar Chart', function () {
    it('should responsive', function () {
      browser.setWindowRect(0, 0, 300, 600);
      officerPage.radarChartSection.lastAxisTitle.waitForDisplayed();
    });

    it('should open radar chart explainer when being clicked and closeable', function () {
      officerPage.radarChartSection.radarChartPlaceHolder.click();

      officerPage.radarChartSection.explainerSection.leftNavigation.waitForDisplayed();

      officerPage.radarChartSection.explainerSection.closeExplainerButton.click();

      officerPage.radarChartSection.explainerSection.leftNavigation.waitForDisplayed(10000, true);
    });

    context('not enough data for radar chart', function () {
      beforeEach(function () {
        browser.setWindowRect(0, 0, 1000, 500);
        officerPage.open(noDataRadarChartOfficerId);
      });

      it('should show NoDataRadarChart', function () {
        officerPage.radarChartSection.noDataRadarChartSection.component.waitForDisplayed();
        officerPage.radarChartSection.noDataRadarChartSection.noDataText.getText().should.eql('no data explain text');
      });

      it('should not open radar chart explainer when being clicked', function () {
        officerPage.radarChartSection.noDataRadarChartSection.component.waitForDisplayed();
        officerPage.radarChartSection.radarChartPlaceHolder.waitForDisplayed(2000, true);

        officerPage.radarChartSection.noDataRadarChartSection.component.click();
        officerPage.radarChartSection.component.click();
        officerPage.radarChartSection.explainerSection.component.waitForDisplayed(10000, true);
      });
    });

    describe('Radar Chart Explainer', function () {
      it('should navigate correctly between explainers when clicking on left and right navigations', function () {
        officerPage.radarChartSection.radarChartPlaceHolder.click();

        officerPage.radarChartSection.explainerSection.triangleExplainer.waitForDisplayed();
        officerPage.radarChartSection.explainerSection.leftNavigation.getText().should.eql('Percentiles by year');
        officerPage.radarChartSection.explainerSection.rightNavigation.getText().should.eql('What is the scale?');

        officerPage.radarChartSection.explainerSection.leftNavigation.click();

        officerPage.radarChartSection.explainerSection.percentileByYear.waitForDisplayed();
        officerPage.radarChartSection.explainerSection.leftNavigation.getText().should.eql('What is the scale?');
        officerPage.radarChartSection.explainerSection.rightNavigation.getText().should.eql('What is this triangle?');

        officerPage.radarChartSection.explainerSection.leftNavigation.click();

        officerPage.radarChartSection.explainerSection.scaleExplainer.waitForDisplayed();
        officerPage.radarChartSection.explainerSection.leftNavigation.getText().should.eql('What is this triangle?');
        officerPage.radarChartSection.explainerSection.rightNavigation.getText().should.eql('Percentiles by year');

        officerPage.radarChartSection.explainerSection.leftNavigation.click();

        officerPage.radarChartSection.explainerSection.triangleExplainer.waitForDisplayed();
        officerPage.radarChartSection.explainerSection.leftNavigation.getText().should.eql('Percentiles by year');
        officerPage.radarChartSection.explainerSection.rightNavigation.getText().should.eql('What is the scale?');

        officerPage.radarChartSection.explainerSection.rightNavigation.click();

        officerPage.radarChartSection.explainerSection.scaleExplainer.waitForDisplayed();
        officerPage.radarChartSection.explainerSection.leftNavigation.getText().should.eql('What is this triangle?');
        officerPage.radarChartSection.explainerSection.rightNavigation.getText().should.eql('Percentiles by year');

        officerPage.radarChartSection.explainerSection.rightNavigation.click();

        officerPage.radarChartSection.explainerSection.percentileByYear.waitForDisplayed();
        officerPage.radarChartSection.explainerSection.leftNavigation.getText().should.eql('What is the scale?');
        officerPage.radarChartSection.explainerSection.rightNavigation.getText().should.eql('What is this triangle?');

        officerPage.radarChartSection.explainerSection.rightNavigation.click();

        officerPage.radarChartSection.explainerSection.triangleExplainer.waitForDisplayed();
        officerPage.radarChartSection.explainerSection.leftNavigation.getText().should.eql('Percentiles by year');
        officerPage.radarChartSection.explainerSection.rightNavigation.getText().should.eql('What is the scale?');
      });

      it('should hide word "Reports" if screen is too small', function () {
        officerPage.radarChartSection.radarChartPlaceHolder.click();
        officerPage.radarChartSection.explainerSection.leftNavigation.click();

        const percentileByYear = officerPage.radarChartSection.explainerSection.percentileByYear;
        percentileByYear.getText().should.containEql('Use Of Force Reports');

        browser.setWindowRect(0, 0, 800, 500);

        percentileByYear.getText().should.containEql('Use Of Force');
        percentileByYear.getText().should.not.containEql('Reports');
      });
    });
  });

  describe('Timeline', function () {
    it('should go to cr page when clicking on an cr timeline item', function () {
      officerPage.tabbedPaneSection.timelineSection.crItem.waitForDisplayed();
      officerPage.tabbedPaneSection.timelineSection.crItem.click();

      browser.getUrl().should.match(/\/complaint\/\w+\/$/);

      header.breadcrumbs.secondItem.click();
      browser.getUrl().should.match(/\/officer\/\d+\/[-a-z]+\/?$/);
    });

    it('should go to attachment source page when clicking on the attachment thumbnail', function () {
      officerPage.tabbedPaneSection.timelineSection.attachmentThumbnail.waitForDisplayed();
      officerPage.tabbedPaneSection.timelineSection.attachmentThumbnail.click();
      browser.switchWindow('https://www.documentcloud.org/documents/3518950-CRID-294088-CR.html');
    });

    it('should go to attachment tab when clicking on the more attachment', function () {
      officerPage.tabbedPaneSection.timelineSection.moreAttachment.waitForDisplayed();
      officerPage.tabbedPaneSection.timelineSection.moreAttachment.click();
      officerPage.tabbedPaneSection.attachmentsSection.attachmentComplaint.waitForDisplayed();
    });

    it('should go to trr page when clicking on an trr timeline item', function () {
      officerPage.tabbedPaneSection.timelineSection.trrItem.waitForDisplayed();
      officerPage.tabbedPaneSection.timelineSection.trrItem.click();

      browser.getUrl().should.match(/\/trr\/\d+\/$/);

      header.breadcrumbs.secondItem.click();
      browser.getUrl().should.match(/\/officer\/\d+\/[-a-z]+\/?$/);
    });

    describe('Timeline filter', function () {
      beforeEach(function () {
        officerPage.tabbedPaneSection.timelineSection.filter.button.waitForDisplayed();
        officerPage.tabbedPaneSection.timelineSection.filter.button.click();
      });

      afterEach(function () {
        officerPage.tabbedPaneSection.timelineSection.unitChangeItem.waitForDisplayed();
        officerPage.tabbedPaneSection.timelineSection.joinedItem.waitForDisplayed();
        officerPage.tabbedPaneSection.timelineSection.yearItem.waitForDisplayed();
        officerPage.tabbedPaneSection.timelineSection.emptyItem.waitForDisplayed();
      });

      it('should filter all events by by default', function () {
        officerPage.tabbedPaneSection.timelineSection.crItem.waitForDisplayed();
        officerPage.tabbedPaneSection.timelineSection.trrItem.waitForDisplayed();
        officerPage.tabbedPaneSection.timelineSection.awardItem.waitForDisplayed();
      });

      it('should filter complaints', function () {
        officerPage.tabbedPaneSection.timelineSection.filter.crs.click();

        showingComplaints(officerPage).should.be.true();
      });

      it('should filter sustained', function () {
        officerPage.tabbedPaneSection.timelineSection.filter.sustained.click();

        officerPage.tabbedPaneSection.timelineSection.crItem.waitForDisplayed();
        officerPage.tabbedPaneSection.timelineSection.crItem.count.should.eql(1);
        officerPage.tabbedPaneSection.timelineSection.trrItem.waitForDisplayed(1000, true);
        officerPage.tabbedPaneSection.timelineSection.awardItem.waitForDisplayed(1000, true);
      });

      it('should filter TRRs', function () {
        officerPage.tabbedPaneSection.timelineSection.filter.force.click();

        officerPage.tabbedPaneSection.timelineSection.crItem.waitForDisplayed(1000, true);
        officerPage.tabbedPaneSection.timelineSection.trrItem.waitForDisplayed();
        officerPage.tabbedPaneSection.timelineSection.awardItem.waitForDisplayed(1000, true);
      });

      it('should filter awards', function () {
        officerPage.tabbedPaneSection.timelineSection.filter.awards.click();

        officerPage.tabbedPaneSection.timelineSection.crItem.waitForDisplayed(1000, true);
        officerPage.tabbedPaneSection.timelineSection.trrItem.waitForDisplayed(1000, true);
        officerPage.tabbedPaneSection.timelineSection.awardItem.waitForDisplayed();
      });

      it('should filter rank/unit changes', function () {
        officerPage.tabbedPaneSection.timelineSection.filter.changes.click();

        officerPage.tabbedPaneSection.timelineSection.crItem.waitForDisplayed(1000, true);
        officerPage.tabbedPaneSection.timelineSection.trrItem.waitForDisplayed(1000, true);
        officerPage.tabbedPaneSection.timelineSection.awardItem.waitForDisplayed(1000, true);
        officerPage.tabbedPaneSection.timelineSection.rankChangeItem.waitForDisplayed();
        officerPage.tabbedPaneSection.timelineSection.unitChangeItem.waitForDisplayed();
      });

      it('should close the menu when blurring', function () {
        officerPage.tabbedPaneSection.timelineSection.yearItem.click();
        officerPage.tabbedPaneSection.timelineSection.filter.menu.waitForDisplayed(1000, true);
      });

      it('should keep selected filter when changing tab', function () {
        officerPage.tabbedPaneSection.timelineSection.filter.crs.click();

        showingComplaints(officerPage).should.be.true();

        officerPage.tabbedPaneSection.coaccusalsTabName.click();
        officerPage.tabbedPaneSection.timelineTabName.click();

        showingComplaints(officerPage).should.be.true();
      });

      it('should reset filter when navigating to another officer page', function () {
        officerPage.tabbedPaneSection.timelineSection.filter.crs.click();

        showingComplaints(officerPage).should.be.true();

        officerPage.tabbedPaneSection.coaccusalsTabName.click();
        officerPage.tabbedPaneSection.coaccusalsSection.firstCoaccusalCard.click();

        browser.getUrl().should.containEql('officer/2/');
        showingAllEvents(officerPage).should.be.true();
      });
    });
  });

  describe('Coaccusals', function () {
    it('should navigate to officer page when clicking on a CoaccusalCard', function () {
      officerPage.tabbedPaneSection.timelineSection.header.waitForDisplayed();

      browser.getUrl().should.match(/\/officer\/1\/bernadette-kelly\/$/);

      officerPage.tabbedPaneSection.coaccusalsTabName.click();
      officerPage.tabbedPaneSection.coaccusalsSection.firstCoaccusalGroupName.waitForDisplayed();
      officerPage.tabbedPaneSection.coaccusalsSection.firstCoaccusalCard.click();

      browser.getUrl().should.match(/\/officer\/2\/john-kelly\/$/);
    });
  });

  describe('Attachments', function () {
    beforeEach(function () {
      officerPage.tabbedPaneSection.attachmentsTabName.click();
    });

    it('should go to complaint page when clicking on the complaint heading', function () {
      officerPage.tabbedPaneSection.attachmentsSection.attachmentComplaint.waitForDisplayed();
      officerPage.tabbedPaneSection.attachmentsSection.attachmentHeading.click();
      browser.getUrl().should.match(/\/complaint\/294088\/$/);
    });

    it('should go to attachment source page when clicking on the complaint attachment', function () {
      officerPage.tabbedPaneSection.attachmentsSection.attachmentComplaint.waitForDisplayed();
      officerPage.tabbedPaneSection.attachmentsSection.attachment.click();
      browser.switchWindow('https://www.documentcloud.org/documents/3518950-CRID-294088-CR.html');
    });
  });

  describe('Officer CMS text editor', function () {
    context('no data radar chart', function () {
      beforeEach(function () {
        officerPage.open(noDataRadarChartOfficerId);
        officerPage.openEditMode();
        officerPage.radarChartSection.noDataRadarChartSection.noDataText.moveTo();
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
        officerPage.radarChartSection.explainerSection.triangleExplainerText.moveTo();
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
        officerPage.radarChartSection.explainerSection.scaleExplainerText.moveTo();
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

  describe('Route tab', function () {
    it('should open tab corresponding to url suffix', function () {
      officerPage.open(1, 'bernadette-kelly', 'map');
      officerPage.tabbedPaneSection.mapSection.map.waitForDisplayed();
      browser.getUrl().should.match(/\/officer\/1\/bernadette-kelly\/map\/$/);

      officerPage.open(1, 'bernadette-kelly', 'coaccusals');
      officerPage.tabbedPaneSection.coaccusalsSection.firstCoaccusalCard.waitForDisplayed();
      browser.getUrl().should.match(/\/officer\/1\/bernadette-kelly\/coaccusals\/$/);

      officerPage.open(1, 'bernadette-kelly', 'documents');
      officerPage.tabbedPaneSection.attachmentsSection.attachment.waitForDisplayed();
      browser.getUrl().should.match(/\/officer\/1\/bernadette-kelly\/documents\/$/);

      officerPage.open(1, '', 'documents');
      officerPage.tabbedPaneSection.attachmentsSection.attachment.waitForDisplayed();
      browser.getUrl().should.match(/\/officer\/1\/bernadette-kelly\/documents\/$/);

      officerPage.open(1, 'bernadette-wrong-name', 'documents');
      officerPage.tabbedPaneSection.attachmentsSection.attachment.waitForDisplayed();
      browser.getUrl().should.match(/\/officer\/1\/bernadette-kelly\/documents\/$/);

      officerPage.open(1, 'bernadette-kelly', 'wrong-tab');
      officerPage.tabbedPaneSection.timelineSection.header.waitForDisplayed();
      browser.getUrl().should.match(/\/officer\/1\/bernadette-kelly\/$/);
    });

    it('should change the url corresponding to current tab', function () {
      officerPage.open(1);

      officerPage.tabbedPaneSection.mapTabName.click();
      browser.getUrl().should.match(/\/officer\/1\/bernadette-kelly\/map\/$/);

      officerPage.tabbedPaneSection.coaccusalsTabName.click();
      browser.getUrl().should.match(/\/officer\/1\/bernadette-kelly\/coaccusals\/$/);

      officerPage.tabbedPaneSection.attachmentsTabName.click();
      browser.getUrl().should.match(/\/officer\/1\/bernadette-kelly\/documents\/$/);

      officerPage.tabbedPaneSection.timelineTabName.click();
      browser.getUrl().should.match(/\/officer\/1\/bernadette-kelly\/$/);
    });
  });

  describe('Pinboard function', function () {
    context('coaccusals officer', function () {
      it('should display toast when pinning', function () {
        officerPage.tabbedPaneSection.timelineSection.header.waitForDisplayed();
        officerPage.tabbedPaneSection.coaccusalsTabName.click();
        officerPage.tabbedPaneSection.coaccusalsSection.firstCoaccusalGroupName.waitForDisplayed();

        officerPage.tabbedPaneSection.coaccusalsSection.firstPinButton.click();
        officerPage.lastToast.waitForDisplayed();
        officerPage.lastToast.waitForText(
          'Police Officer John Kelly 67-year-old white male, with 2 complaints, 1 sustained added.' +
          '\nGo to pinboard'
        );

        officerPage.landingPageBreadCrumb.click();
        landingPage.searchSection.mainElement.waitForDisplayed();
        landingPage.searchSection.mainElement.click();
        searchPage.pinboardButton.waitForText('Pinboard (1)');
      });

      it('should display toast when unpinning', function () {
        officerPage.tabbedPaneSection.timelineSection.header.waitForDisplayed();
        officerPage.tabbedPaneSection.coaccusalsTabName.click();
        officerPage.tabbedPaneSection.coaccusalsSection.firstCoaccusalGroupName.waitForDisplayed();

        officerPage.tabbedPaneSection.coaccusalsSection.firstPinButton.click();
        officerPage.lastToast.waitForDisplayed();
        officerPage.lastToast.waitForText(
          'Police Officer John Kelly 67-year-old white male, with 2 complaints, 1 sustained added.' +
          '\nGo to pinboard'
        );

        officerPage.tabbedPaneSection.coaccusalsSection.firstPinButton.click();
        officerPage.lastToast.waitForDisplayed();
        officerPage.lastToast.waitForText(
          'Police Officer John Kelly 67-year-old white male, with 2 complaints, 1 sustained removed.' +
          '\nGo to pinboard'
        );

        officerPage.landingPageBreadCrumb.click();
        landingPage.searchSection.mainElement.waitForDisplayed();
        landingPage.searchSection.mainElement.click();
        searchPage.pinboardButton.waitForText('Pinboard (0)');
      });
    });

    context('current officer', function () {
      context('when user has no or only one active pinboard', function () {
        beforeEach(function () {
          setupMockApiFile('officer-page/user-has-no-or-only-one-active-pinboard.js');
          officerPage.open();
        });

        afterEach(function () {
          restoreMockApiFile();
        });

        it('should display toast when pinning', function () {
          officerPage.pinButton.click();
          officerPage.lastToast.waitForDisplayed();

          officerPage.lastToast.waitForText(
            'Police Officer Bernadette Kelly 54-year-old White Male, with 1 complaints, 4 sustained added.' +
            '\nGo to pinboard'
          );

          officerPage.landingPageBreadCrumb.click();
          landingPage.searchSection.mainElement.waitForDisplayed();
          landingPage.searchSection.mainElement.click();
          searchPage.pinboardButton.waitForText('Pinboard (1)');
        });

        it('should display toast when unpinning', function () {
          officerPage.pinButton.click();
          officerPage.lastToast.waitForDisplayed();
          officerPage.lastToast.waitForText(
            'Police Officer Bernadette Kelly 54-year-old White Male, with 1 complaints, 4 sustained added.' +
            '\nGo to pinboard'
          );

          officerPage.pinButton.click();
          officerPage.lastToast.waitForDisplayed();
          officerPage.lastToast.waitForText(
            'Police Officer Bernadette Kelly 54-year-old White Male, with 1 complaints, 4 sustained removed.' +
            '\nGo to pinboard'
          );

          officerPage.landingPageBreadCrumb.click();
          landingPage.searchSection.mainElement.waitForDisplayed();
          landingPage.searchSection.mainElement.click();
          searchPage.pinboardButton.waitForText('Pinboard (0)');
        });
      });

      context('when user has more than 1 pinboard', function () {
        it('should display pinboards menu', function () {
          officerPage.pinboardsMenuSection.addToPinboardButton.click();
          officerPage.pinboardsMenuSection.menu.waitForDisplayed();

          officerPage.pinboardsMenuSection.items.waitForCount(5, 1000);
          officerPage.pinboardsMenuSection.firstItemTitle.getText().should.equal('Skrull Cap');
          officerPage.pinboardsMenuSection.firstItemCreatedAt.getText().should.equal('Created Mar 09, 2020');
          officerPage.pinboardsMenuSection.secondItemTitle.getText().should.equal('Watts Crew');
          officerPage.pinboardsMenuSection.secondItemCreatedAt.getText().should.equal('Created Mar 09, 2020');
          officerPage.pinboardsMenuSection.thirdItemTitle.getText().should.equal('');
          officerPage.pinboardsMenuSection.thirdItemCreatedAt.getText().should.equal('Created Mar 09, 2020');
        });

        it('should close pinboards menu when click outside', function () {
          officerPage.pinboardsMenuSection.addToPinboardButton.click();
          officerPage.pinboardsMenuSection.menu.waitForDisplayed();
          officerPage.tabbedPaneSection.timelineTabName.click();
          officerPage.pinboardsMenuSection.menu.waitForDisplayed(500, true);
        });

        it('should display toast and close pinboards menu when pinning', function () {
          officerPage.pinboardsMenuSection.addToPinboardButton.click();
          officerPage.pinboardsMenuSection.menu.waitForDisplayed();

          officerPage.pinboardsMenuSection.firstItemPinButton.click();
          officerPage.lastToast.waitForDisplayed();
          officerPage.lastToast.waitForText(
            'Police Officer Bernadette Kelly 54-year-old White Male, with 1 complaints, 4 sustained added.' +
            '\nGo to pinboard'
          );
          officerPage.pinboardsMenuSection.menu.isDisplayed().should.be.false();

          officerPage.landingPageBreadCrumb.click();
          landingPage.searchSection.mainElement.waitForDisplayed();
          landingPage.searchSection.mainElement.click();
          searchPage.pinboardButton.waitForText('Pinboard (4)');
        });

        it('should display toast when unpinning', function () {
          officerPage.pinboardsMenuSection.addToPinboardButton.click();
          officerPage.pinboardsMenuSection.menu.waitForDisplayed();

          officerPage.pinboardsMenuSection.firstItemPinButton.click();
          officerPage.lastToast.waitForDisplayed();
          officerPage.lastToast.waitForText(
            'Police Officer Bernadette Kelly 54-year-old White Male, with 1 complaints, 4 sustained added.' +
            '\nGo to pinboard'
          );
          officerPage.pinboardsMenuSection.menu.isDisplayed().should.be.false();
          officerPage.pinboardsMenuSection.addToPinboardButton.moveTo(); // Move mouse outside of toast message
          officerPage.lastToast.waitForDisplayed(5000, true);

          officerPage.pinboardsMenuSection.addToPinboardButton.click();
          officerPage.pinboardsMenuSection.menu.waitForDisplayed();
          officerPage.pinboardsMenuSection.firstItemPinButton.click();
          officerPage.lastToast.waitForDisplayed();
          officerPage.lastToast.waitForText(
            'Police Officer Bernadette Kelly 54-year-old White Male, with 1 complaints, 4 sustained removed.' +
            '\nGo to pinboard'
          );
          officerPage.pinboardsMenuSection.menu.isDisplayed().should.be.false();

          officerPage.landingPageBreadCrumb.click();
          landingPage.searchSection.mainElement.waitForDisplayed();
          landingPage.searchSection.mainElement.click();
          searchPage.pinboardButton.waitForText('Pinboard (3)');
        });

        it('should create new pinboard with current officer', function () {
          officerPage.pinboardsMenuSection.addToPinboardButton.click();
          officerPage.pinboardsMenuSection.menu.waitForDisplayed();
          officerPage.pinboardsMenuSection.createPinboardWithSelectionButton.click();

          browser.waitForUrl(url => url.should.match(/\/pinboard\/f7231a74\/untitled-pinboard\/$/), 1000);
          pinboardPage.pinnedSection.officers.cards.waitForCount(1, 3000);
          pinboardPage.pinnedSection.officers.firstCardName.getText().should.equal('Bernadette Kelly');
        });
      });
    });
  });
});
