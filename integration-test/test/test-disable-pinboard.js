'use strict';

require('should');

import { setupPinboardEnabled, restorePinboardEnabled } from '../utils';
import landingPage from '../page-objects/landing-page';
import searchPage from '../page-objects/search-page';
import officerPage from '../page-objects/officer-page';
import crPage from '../page-objects/cr-page';
import { INTRODUCTION_DISPLAY_TIMEOUT } from '../utils/constants';
import api from '../mock-api';
import { mockCommonApi, mockLandingPageApi } from '../mock-data/utils';
import { groupedSuggestions } from '../mock-data/landing-page/suggestions';
import { crData, crPopupData } from '../mock-data/cr-page/common';
import { relatedComplaintsData } from '../mock-data/cr-page/related-complaints';
import {
  officerData,
  timelineItems,
  coaccusalsData,
  officerPageCmsData,
} from '../mock-data/officer-page/common';
import { pinboardsDetailMenu } from '../mock-data/pinboard-page/manage-pinboards';


const performSearch = (searchPage, term) => {
  searchPage.input.waitForDisplayed();
  searchPage.input.setValue(term);
};

describe('Disable pinboard feature', function () {
  beforeEach(function () {
    mockCommonApi();
    setupPinboardEnabled(false);
  });

  afterEach(function () {
    restorePinboardEnabled();
  });

  it('should redirect to landing page if users go to pinboard page via url', function () {
    browser.url('/pinboard/77edc128/untitled-pinboard/');
    landingPage.header.content.waitForDisplayed();
    browser.getUrl().should.equal('http://localhost:4000/');
  });

  describe('Landing page', function () {
    beforeEach(function () {
      mockLandingPageApi();
      landingPage.open();
    });

    it('should not display pinboards right link', function () {
      const navBar = landingPage.header.navBar;
      navBar.mainElement.waitForDisplayed();
      navBar.headerLinks.pinboard.waitForDisplayed(2000, true);
      navBar.headerLinks.pinboard.waitForExist();
      navBar.headerLinks.pinboard.isDisplayed().should.be.false();
    });

    it('should not display pinned buttons', function () {
      landingPage.recentActivityCarousel.cards.waitForDisplayed();
      landingPage.recentActivityCarousel.firstPairCard.waitForDisplayed();
      landingPage.recentActivityCarousel.firstPinButton.waitForExist();
      landingPage.recentActivityCarousel.firstPinButton.isDisplayed().should.be.false();
      landingPage.recentActivityCarousel.firstPairCardPinButton.waitForExist();
      landingPage.recentActivityCarousel.firstPairCardPinButton.isDisplayed().should.be.false();

      landingPage.officersByAllegationCarousel.cards.waitForDisplayed();
      landingPage.officersByAllegationCarousel.firstPinButton.waitForExist();
      landingPage.officersByAllegationCarousel.firstPinButton.isDisplayed().should.be.false();

      landingPage.complaintSummariesCarousel.cards.waitForDisplayed();
      landingPage.complaintSummariesCarousel.firstPinButton.waitForExist();
      landingPage.complaintSummariesCarousel.firstPinButton.waitForDisplayed(2000, true);

      landingPage.recentDocumentCarousel.cards.waitForDisplayed();
      landingPage.recentDocumentCarousel.firstPinButton.waitForExist();
      landingPage.recentDocumentCarousel.firstPinButton.isDisplayed().should.be.false();
    });

    it('should not display pinboard button introduciton', function () {
      landingPage.header.content.waitForDisplayed();
      landingPage.pinboardIntroduction.body.isExisting().should.be.false();
    });
  });

  describe('Search page', function () {
    beforeEach(function () {
      api.onGet('/api/v1/suggestion/', { term: 'Ke', limit: 9 }).reply(200, groupedSuggestions['default']);

      searchPage.open();
    });

    it('should not display pinboard bar', function () {
      searchPage.input.waitForDisplayed();

      searchPage.pinboardBar.isDisplayed().should.be.false();
    });

    it('should not display pinned button on search results', function () {
      api.onGet('/api/v1/suggestion/', { term: '2004/04/23', limit: 9 }).reply(200, groupedSuggestions['2004/04/23']);
      api.onGet('/api/v1/suggestion/', { term: 'Kelly', limit: 9 }).reply(200, groupedSuggestions['Kelly']);

      searchPage.input.waitForDisplayed();
      searchPage.input.setValue('Ke');

      searchPage.officerResultsSection.firstResultText.waitForDisplayed();
      searchPage.officerResultsSection.firstPinButton.waitForExist();
      searchPage.officerResultsSection.firstPinButton.isDisplayed().should.be.false();
      searchPage.crResultsSection.firstResultText.waitForDisplayed();
      searchPage.crResultsSection.firstPinButton.waitForExist();
      searchPage.crResultsSection.firstPinButton.isDisplayed().should.be.false();
      searchPage.trrResultsSection.firstResultText.waitForDisplayed();
      searchPage.trrResultsSection.firstPinButton.waitForExist();
      searchPage.trrResultsSection.firstPinButton.isDisplayed().should.be.false();

      searchPage.clearSearchButton.click();
      searchPage.input.setValue('2004/04/23');
      searchPage.dateOfficerResultsSection.firstResultText.waitForDisplayed();
      searchPage.dateOfficerResultsSection.firstPinButton.waitForExist();
      searchPage.dateOfficerResultsSection.firstPinButton.isDisplayed().should.be.false();
      searchPage.dateCRResultsSection.firstResultText.waitForDisplayed();
      searchPage.dateCRResultsSection.firstPinButton.waitForExist();
      searchPage.dateCRResultsSection.firstPinButton.isDisplayed().should.be.false();
      searchPage.dateTRRResultsSection.firstResultText.waitForDisplayed();
      searchPage.dateTRRResultsSection.firstPinButton.waitForExist();
      searchPage.dateTRRResultsSection.firstPinButton.isDisplayed().should.be.false();

      searchPage.clearSearchButton.click();
      searchPage.input.setValue('Kelly');
      searchPage.investigatorCRResultsSection.firstResultText.waitForDisplayed();
      searchPage.investigatorCRResultsSection.firstPinButton.waitForExist();
      searchPage.investigatorCRResultsSection.firstPinButton.isDisplayed().should.be.false();
    });

    it('should not display Add to pinboard button on officer preview pane', function () {
      searchPage.input.waitForDisplayed();
      searchPage.input.setValue('Ke');

      searchPage.officerPreviewPaneSection.wrapper.waitForDisplayed();
      searchPage.officerPreviewPaneSection.pinButton.waitForExist();
      searchPage.officerPreviewPaneSection.pinButton.isDisplayed().should.be.false();
    });

    it('should not display pinned buttons on recent search items', function () {
      const backToSearch = () => {
        searchPage.searchBreadcrumb.waitForDisplayed();
        searchPage.searchBreadcrumb.click();
      };

      const clickOnSearchResultItem = (suggestionGroupSelector, expectedText, isFirstResult=false) => {
        suggestionGroupSelector.waitForDisplayed();
        suggestionGroupSelector.getText().should.containEql(expectedText);
        suggestionGroupSelector.click();
        if (!isFirstResult) {
          suggestionGroupSelector.click();
        }
      };

      performSearch(searchPage, 'Ke');
      clickOnSearchResultItem(searchPage.firstOfficerResult, 'Bernadette Kelly', true);
      backToSearch();
      clickOnSearchResultItem(searchPage.firstCrResult, 'CR # CR123 • April 23, 2004');
      backToSearch();
      clickOnSearchResultItem(searchPage.firstTrrResult, 'Member Presence');
      backToSearch();

      searchPage.clearSearchButton.click();

      const expectedRecentSuggestions = [
        'Member Presence\nTRR # 123 - April 27, 2004',
        'CR # CR123 • April 23, 2004',
        'Bernadette Kelly\n45-year-old, White, Male, 10 Complaints, 2 Sustained',
      ];

      expectedRecentSuggestions.forEach((expectedText, index) => {
        searchPage.recentSuggestionItem(index + 1).getText().should.equal(expectedText);
      });

      searchPage.firstRecentPinButton.waitForExist();
      searchPage.firstRecentPinButton.isDisplayed().should.be.false();
      searchPage.secondRecentPinButton.waitForExist();
      searchPage.secondRecentPinButton.isDisplayed().should.be.false();
      searchPage.thirdRecentPinButton.waitForExist();
      searchPage.thirdRecentPinButton.isDisplayed().should.be.false();
    });

    it('should not display pinboard introduction', function () {
      searchPage.input.waitForDisplayed();
      searchPage.pinboardIntroduction.body.isDisplayed().should.be.false();
    });

    it('should not display PinButton introduction', function () {
      api.onGet('/api/v1/suggestion/', { term: 'intr', limit: 9 }).reply(200, groupedSuggestions['intr']);

      performSearch(searchPage, 'intr');

      searchPage.unitOfficerResultsSection.firstResultText.waitForDisplayed();
      browser.pause(INTRODUCTION_DISPLAY_TIMEOUT);
      searchPage.unitOfficerResultsSection.pinButtonIntroduction.isDisplayed().should.be.false();
    });
  });

  describe('Officer page', function () {
    beforeEach(function () {
      api.onGet('/api/v2/cms-pages/officer-page/').reply(200, officerPageCmsData);
      api.onGet('/api/v2/pinboards/', { detail: true }).reply(200, []);
      api.onGet('/api/v2/officers/1/summary/').reply(200, officerData);
      api.onGet('/api/v2/officers/1/new-timeline-items/').reply(200, timelineItems);
      api.onGet('/api/v2/officers/1/coaccusals/').reply(200, coaccusalsData);
      api.onGet('/api/v2/pinboards/', { detail: true }).reply(200, pinboardsDetailMenu.pinboards);
    });

    it('should not show pinned button on header', function () {
      officerPage.open();
      officerPage.pinboardsMenuSection.addToPinboardButton.waitForExist();
      officerPage.pinboardsMenuSection.addToPinboardButton.isDisplayed().should.be.false();
    });

    it('should not show pinned button on coaccusals cards', function () {
      officerPage.open();
      officerPage.tabbedPaneSection.coaccusalsTabName.waitForDisplayed();
      officerPage.tabbedPaneSection.coaccusalsTabName.click();
      officerPage.tabbedPaneSection.coaccusalsSection.firstCoaccusalCard.waitForDisplayed();
      officerPage.tabbedPaneSection.coaccusalsSection.firstPinButton.waitForExist();
      officerPage.tabbedPaneSection.coaccusalsSection.firstPinButton.isDisplayed().should.be.false();
    });
  });

  describe('CR page', function () {
    beforeEach(function () {
      api.onGet('/api/v2/cr/1000000/').reply(200, crData);
      api.onGet('/api/v2/popup/', { page: 'complaint' }).reply(200, crPopupData);
      api.onGet('/api/v2/pinboards/', { detail: true }).reply(200, []);
      api
        .onGet('/api/v2/cr/1000000/related-complaints/?match=categories&distance=0.5mi')
        .reply(200, relatedComplaintsData({ match: 'categories', distance: '0.5mi' }));

      api
        .onGet('/api/v2/cr/1000000/related-complaints/?distance=0.5mi&match=categories&offset=20')
        .reply(200, relatedComplaintsData({ match: 'categories', distance: '0.5mi', nextOffset: 40 }));
      api.onGet('/api/v2/pinboards/', { detail: true }).reply(200, pinboardsDetailMenu.pinboards);

      crPage.open();
    });

    it('should not show pinned button on header', function () {
      crPage.pinboardsMenuSection.addToPinboardButton.waitForExist();
      crPage.pinboardsMenuSection.addToPinboardButton.isDisplayed().should.be.false();
    });

    it('should not show pinned button on accused officer cards', function () {
      crPage.accusedOfficers.firstCard.name.waitForDisplayed();
      crPage.accusedOfficers.firstCard.pinButton.waitForExist();
      crPage.accusedOfficers.firstCard.pinButton.isDisplayed().should.be.false();
    });
  });
});
