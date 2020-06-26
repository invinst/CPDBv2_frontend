'use strict';

require('should');

import { times } from 'lodash';

import searchPage from './page-objects/search-page';
import landingPage from './page-objects/landing-page';
import pinboardPage from './page-objects/pinboard-page';
import {
  setupMockApiFile,
  restoreMockApiFile,
} from './utils';
import { INTRODUCTION_DISPLAY_TIMEOUT } from './utils/constants';


const backToSearch = () => {
  searchPage.searchBreadcrumb.waitForDisplayed();
  searchPage.searchBreadcrumb.click();
};

const performSearch = (term) => {
  searchPage.input.waitForDisplayed();
  searchPage.input.setValue(term);
};

const clearSearchInput = () => searchPage.clearSearchButton.click();

const clickOnSearchResultItem = (suggestionGroupSelector, expectedText, isFirstResult=false) => {
  suggestionGroupSelector.waitForDisplayed();
  suggestionGroupSelector.getText().should.containEql(expectedText);
  suggestionGroupSelector.click();
  if (!isFirstResult) {
    suggestionGroupSelector.click();
  }
};

describe('Landing Page to Search Page', function () {
  beforeEach(function () {
    landingPage.open();
  });

  it('should activate search page with correct query when user types anything from landing page', function () {
    browser.keys('foobar');
    searchPage.input.waitForDisplayed();
    landingPage.currentBasePath.should.equal('/search/');
    searchPage.input.getValue().should.containEql('foobar');
  });
});

describe('Search Page', function () {
  beforeEach(function () {
    searchPage.open();
    searchPage.input.waitForDisplayed();
  });

  it('should show result when user type in', function () {
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('Ke');

    searchPage.suggestionGroup.waitForDisplayed();
    searchPage.suggestionTags.getText().should.containEql('OFFICER');
    searchPage.suggestionTags.getText().should.containEql('NEIGHBORHOOD');
    searchPage.firstOfficerResult.waitForDisplayed();
    searchPage.firstOfficerResult.getText().should.containEql('Bernadette Kelly'); // officer name
    searchPage.firstOfficerResult.getText().should.containEql('45-year-old, White, Male, '); // officer demographic
    searchPage.firstOfficerResult.getText().should.containEql('10 Complaints, '); // officer complaints
    searchPage.firstOfficerResult.getText().should.containEql('2 Sustained'); // officer sustained

    searchPage.firstNeighborhoodResult.waitForDisplayed();
    searchPage.firstNeighborhoodResult.getText().should.containEql('Kenwood'); // neighborhood
  });

  it('should able to show trr and cr results', function () {
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('Ke');

    searchPage.crResultsSection.results.waitForDisplayed();
    searchPage.suggestionTags.getText().should.containEql('CR');
    searchPage.suggestionTags.getText().should.containEql('TRR');

    searchPage.crResultsSection.results.count.should.equal(2);
    searchPage.crResultsSection.firstResultText.getText().should.equal('CR # CR123 • April 23, 2004');
    searchPage.crResultsSection.firstResultSubText.getText().should.equal('an officer named Kelly caught the victim');
    searchPage.crResultsSection.secondResultText.getText().should.equal('CR # CR456 • November 12, 2006');
    searchPage.crResultsSection.secondResultSubText.getText().should.equal('');

    searchPage.trrResultsSection.results.count.should.equal(2);
    searchPage.trrResultsSection.firstResultText.getText().should.equal('Member Presence');
    searchPage.trrResultsSection.firstResultSubText.getText().should.equal('TRR # 123 - April 27, 2004');
    searchPage.trrResultsSection.secondResultText.getText().should.equal('Unknown');
    searchPage.trrResultsSection.secondResultSubText.getText().should.equal('TRR # 456');
  });

  it('should able to show INVESTIGATOR > CR results', function () {
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('Kelly');

    searchPage.investigatorCRResultsSection.results.waitForDisplayed();
    searchPage.suggestionTags.getText().should.containEql('INVESTIGATOR > CR');

    searchPage.investigatorCRResultsSection.results.count.should.equal(2);
    searchPage.investigatorCRResultsSection.firstResultText.getText().should.equal('CR # CR123456 • April 23, 2004');
    searchPage.investigatorCRResultsSection.firstResultSubText.getText().should.equal(
      'an officer named Kelly caught the victim'
    );
    searchPage.investigatorCRResultsSection.secondResultText.getText().should.equal('CR # CR654321');
    searchPage.investigatorCRResultsSection.secondResultSubText.getText().should.equal('');
    searchPage.investigatorCRResultsSection.firstResultText.click();
    searchPage.crPreviewPaneSection.callToAction.getText().should.eql('View Complaint Record');
  });

  it('should able to show date > trr and date > cr results', function () {
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('2004/04/23');

    searchPage.dateCRResultsSection.results.waitForDisplayed();
    searchPage.suggestionTags.getText().should.containEql('DATE > CR');
    searchPage.suggestionTags.getText().should.containEql('DATE > TRR');

    searchPage.dateCRResultsSection.results.count.should.equal(2);
    searchPage.dateCRResultsSection.firstResultText.getText().should.equal('CR # CR123 • April 23, 2004');
    searchPage.dateCRResultsSection.firstResultSubText.getText().should.equal('');
    searchPage.dateCRResultsSection.secondResultText.getText().should.equal('CR # CR456 • April 23, 2004');
    searchPage.dateCRResultsSection.secondResultSubText.getText().should.equal('');
    searchPage.crPreviewPaneSection.callToAction.getText().should.eql('View Complaint Record');

    searchPage.dateTRRResultsSection.results.count.should.equal(2);
    searchPage.dateTRRResultsSection.firstResultText.getText().should.equal('Member Presence');
    searchPage.dateTRRResultsSection.firstResultSubText.getText().should.equal('TRR # 123 - April 23, 2004');
    searchPage.dateTRRResultsSection.secondResultText.getText().should.equal('Physical Force - Holding');
    searchPage.dateTRRResultsSection.secondResultSubText.getText().should.equal('TRR # 456 - April 23, 2004');
  });

  it('should able to show DATE > OFFICERS results', function () {
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('2004/04/23');

    searchPage.dateOfficerResultsSection.results.waitForDisplayed();
    searchPage.suggestionTags.getText().should.containEql('DATE > OFFICERS');

    searchPage.dateOfficerResultsSection.results.count.should.equal(2);
    searchPage.dateOfficerResultsSection.firstResultText.getText().should.equal('Jerome Finnigan');
    searchPage.dateOfficerResultsSection.firstResultSubText.getText().should.containEql('42-year-old, White, Male,');
    searchPage.dateOfficerResultsSection.firstResultSubText.getText().should.containEql('20 Complaints');
    searchPage.dateOfficerResultsSection.firstResultSubText.getText().should.containEql('0 Sustained');

    searchPage.dateOfficerResultsSection.secondResultText.getText().should.equal('Edward May');
    searchPage.dateOfficerResultsSection.secondResultSubText.getText().should.containEql('48-year-old, White, Male,');
    searchPage.dateOfficerResultsSection.secondResultSubText.getText().should.containEql('20 Complaints');
    searchPage.dateOfficerResultsSection.secondResultSubText.getText().should.containEql('0 Sustained');
  });

  it('should able to show RANK results', function () {
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('rank');

    searchPage.rankResultsSection.results.waitForDisplayed();
    searchPage.rankResultsSection.results.count.should.equal(2);

    searchPage.rankResultsSection.firstResultText.getText().should.equal('Officer');
    searchPage.rankResultsSection.secondResultText.getText().should.equal('Chief');
  });

  it('should able to show SEARCH-TERMS results', function () {
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('Geography');
    searchPage.searchTermsResultsSection.results.waitForDisplayed();
    searchPage.searchTermsResultsSection.results.count.should.equal(1);

    searchPage.searchTermsResultsSection.firstResultText.getText().should.equal('Geography - Communities');
    searchPage.searchTermsResultsSection.firstResultText.click();
    searchPage.searchTermsResultsSection.previewPaneTitle.getText().should.containEql('Communities');
    searchPage.searchTermsResultsSection.previewPaneButton.getText().should.containEql('View ALL Communities');
    searchPage.searchTermsResultsSection.previewPaneButton.click();
    browser.pause(600);
    browser.getUrl().should.containEql('/search/?q=community&type=COMMUNITY');
    searchPage.input.getValue().should.eql('community:community');
    searchPage.searchCommunityResultsSection.firstResultText.getText().should.equal('Austin');
  });

  it('should able to show single search results', function () {
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('jerome');

    searchPage.officerResultsSection.results.waitForDisplayed();
    searchPage.searchCommunityResultsSection.results.waitForDisplayed();
    searchPage.crResultsSection.results.waitForDisplayed();
    searchPage.trrResultsSection.results.waitForDisplayed();

    searchPage.officerResultsSection.firstResultText.getText().should.equal('Jerome Finnigan');
    searchPage.searchCommunityResultsSection.firstResultText.getText().should.equal('Loop');
    searchPage.crResultsSection.firstResultText.getText().should.equal('CR # CR123 • April 23, 2004');
    searchPage.trrResultsSection.firstResultText.getText().should.equal('Member Presence');

    searchPage.suggestionTags.waitForDisplayed();
    searchPage.suggestionTagCount().should.equal(4);
    searchPage.suggestionTag(1).getText().should.equal('OFFICER');
    searchPage.suggestionTag(2).getText().should.equal('COMMUNITY');
    searchPage.suggestionTag(3).getText().should.equal('CR');
    searchPage.suggestionTag(4).getText().should.equal('TRR');

    searchPage.suggestionTag(1).click();
    searchPage.input.getValue().should.eql('officer:jerome');
    searchPage.officerResultsSection.results.waitForDisplayed();
    searchPage.officerResultsSection.resultsCount('OFFICER').should.equal(20);
    searchPage.officerResultsSection.firstResultText.getText().should.equal('Jerome Finnigan');
    searchPage.officerResultsSection.secondResultText.getText().should.equal('Edward May');
    searchPage.searchCommunityResultsSection.results.waitForDisplayed(500, true);
    searchPage.crResultsSection.results.waitForDisplayed(500, true);
    searchPage.trrResultsSection.results.waitForDisplayed(500, true);

    searchPage.suggestionTag(2).click();
    searchPage.input.getValue().should.eql('community:jerome');
    searchPage.searchCommunityResultsSection.results.waitForDisplayed();
    searchPage.searchCommunityResultsSection.resultsCount('COMMUNITY').should.equal(1);
    searchPage.searchCommunityResultsSection.firstResultText.getText().should.equal('Loop');
    searchPage.officerResultsSection.results.waitForDisplayed(500, true);
    searchPage.crResultsSection.results.waitForDisplayed(500, true);
    searchPage.trrResultsSection.results.waitForDisplayed(500, true);

    searchPage.suggestionTag(3).click();
    searchPage.input.getValue().should.eql('cr:jerome');
    searchPage.crResultsSection.results.waitForDisplayed();
    searchPage.crResultsSection.resultsCount('CR').should.equal(2);
    searchPage.crResultsSection.firstResultText.getText().should.equal('CR # CR123 • April 23, 2004');
    searchPage.crResultsSection.secondResultText.getText().should.equal('CR # CR456 • November 12, 2006');
    searchPage.officerResultsSection.results.waitForDisplayed(500, true);
    searchPage.searchCommunityResultsSection.results.waitForDisplayed(500, true);
    searchPage.trrResultsSection.results.waitForDisplayed(500, true);

    searchPage.suggestionTag(4).click();
    searchPage.input.getValue().should.eql('trr:jerome');
    searchPage.trrResultsSection.results.waitForDisplayed();
    searchPage.trrResultsSection.resultsCount('TRR').should.equal(2);
    searchPage.trrResultsSection.firstResultText.getText().should.equal('Member Presence');
    searchPage.trrResultsSection.secondResultText.getText().should.equal('Verbal Commands');
    searchPage.officerResultsSection.results.waitForDisplayed(500, true);
    searchPage.searchCommunityResultsSection.results.waitForDisplayed(500, true);
    searchPage.crResultsSection.results.waitForDisplayed(500, true);
  });

  it('should able to show single search results with prefix query', function () {
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('officer:jerome');

    searchPage.officerResultsSection.results.waitForDisplayed();
    searchPage.suggestionTagCount().should.equal(4);
    searchPage.suggestionTag(1).getText().should.equal('OFFICER');
    searchPage.suggestionTag(2).getText().should.equal('COMMUNITY');
    searchPage.suggestionTag(3).getText().should.equal('CR');
    searchPage.suggestionTag(4).getText().should.equal('TRR');

    searchPage.officerResultsSection.resultsCount('OFFICER').should.equal(20);
    searchPage.officerResultsSection.firstResultText.getText().should.equal('Jerome Finnigan');
    searchPage.officerResultsSection.secondResultText.getText().should.equal('Edward May');
    searchPage.searchCommunityResultsSection.results.waitForDisplayed(500, true);
    searchPage.crResultsSection.results.waitForDisplayed(500, true);
    searchPage.trrResultsSection.results.waitForDisplayed(500, true);
  });

  it('should show filtered result when user clicks "More"', function () {
    browser.setWindowRect(0, 0, 900, 600);
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('jerome');

    searchPage.suggestionGroup.waitForDisplayed();
    searchPage.suggestionTagCount().should.equal(4);
    searchPage.suggestionTag(1).getText().should.equal('OFFICER');
    searchPage.suggestionTag(2).getText().should.equal('COMMUNITY');
    searchPage.suggestionTag(3).getText().should.equal('CR');
    searchPage.suggestionTag(4).getText().should.equal('TRR');

    searchPage.firstLoadMoreButton.click();

    searchPage.input.getValue().should.eql('officer:jerome');
    searchPage.officerResultsSection.resultsCount('OFFICER').should.equal(20);

    times(21, () => browser.keys('ArrowDown'));

    browser.waitUntil(function () {
      return searchPage.officerResultsSection.resultsCount('OFFICER') === 25;
    }, 2000, 'expected officer suggestions are 25');
    searchPage.officerResultsSection.resultsCount('OFFICER').should.equal(25);

    searchPage.contentWrapper.waitForDisplayed();
    const content = searchPage.contentWrapper.getText();
    content.should.containEql('OFFICER');
    content.should.containEql('Jerome Finnigan');
    content.should.containEql('Edward May'); // another officer
    searchPage.searchCommunityResultsSection.results.waitForDisplayed(500, true);
    searchPage.crResultsSection.results.waitForDisplayed(500, true);
    searchPage.trrResultsSection.results.waitForDisplayed(500, true);
  });

  it('should show filtered result when user presses enter when focusing on "Show more results"', function () {
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('jerome');

    searchPage.suggestionGroup.waitForDisplayed();
    searchPage.suggestionTagCount().should.equal(4);
    searchPage.suggestionTag(1).getText().should.equal('OFFICER');
    searchPage.suggestionTag(2).getText().should.equal('COMMUNITY');
    searchPage.suggestionTag(3).getText().should.equal('CR');
    searchPage.suggestionTag(4).getText().should.equal('TRR');

    times(6, () => browser.keys('ArrowDown'));
    browser.keys('Enter');
    browser.pause(100);

    searchPage.contentWrapper.waitForDisplayed();
    searchPage.input.getValue().should.eql('officer:jerome');
    const content = searchPage.contentWrapper.getText();
    content.should.containEql('OFFICER');
    content.should.containEql('Jerome Finnigan');
    content.should.containEql('Edward May'); // another officer
    searchPage.searchCommunityResultsSection.results.waitForDisplayed(500, true);
    searchPage.crResultsSection.results.waitForDisplayed(500, true);
    searchPage.trrResultsSection.results.waitForDisplayed(500, true);
  });

  it('should show DataTool suggestions when no result return', function () {
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('noresult');

    searchPage.contentWrapper.waitForDisplayed();
    searchPage.suggestionTags.waitForDisplayed();
    browser.pause(100);
    searchPage.contentWrapper.getText().should.containEql('DATA TOOL');
    searchPage.firstSuggestionTag.getText().should.containEql('Data Tool');
  });

  it('should trigger officer summary page when click on officer then press Enter', function () {
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('Ke');

    searchPage.secondOfficerResult.waitForDisplayed();
    searchPage.secondOfficerResult.click();
    browser.keys('Enter');
    searchPage.currentBasePath.should.eql('/officer/2/john-kelly/');
  });

  it('should trigger officer summary page when click on co-accused then press Enter', function () {
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('Ke');

    searchPage.firstCoAccusedResult.waitForDisplayed();
    searchPage.firstCoAccusedResult.click();
    browser.keys('Enter');
    searchPage.currentBasePath.should.eql('/officer/1/bernadette-kelly/');
  });

  it('should focus on clicked item', function () {
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('Ke');

    searchPage.suggestionGroup.waitForDisplayed();
    searchPage.secondOfficerResult.waitForDisplayed();

    searchPage.secondOfficerResult.getAttribute('class').should.not.containEql('test--focused');

    searchPage.secondOfficerResult.click();

    searchPage.secondOfficerResult.getAttribute('class').should.containEql('test--focused');
  });

  it('should focus on search result items correctly after changing to single content result page', function () {
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('Ke');

    searchPage.suggestionGroup.waitForDisplayed();
    searchPage.secondLoadMoreButton.waitForDisplayed();
    searchPage.secondLoadMoreButton.click();

    searchPage.secondLoadMoreButton.waitForDisplayed(1000, true);
    searchPage.secondNeighborhoodResult.waitForDisplayed();

    searchPage.secondNeighborhoodResult.getAttribute('class').should.not.containEql('test--focused');

    searchPage.secondNeighborhoodResult.click();

    searchPage.secondNeighborhoodResult.getAttribute('class').should.containEql('test--focused');
  });

  context('Pinboard introduction', function () {
    beforeEach(function () {
      browser.clearReduxStore(true);
      searchPage.input.waitForDisplayed();
    });

    it('should display pinboard introduction on first visited', function () {
      searchPage.pinboardIntroduction.body.waitForDisplayed();
    });

    it('should not display pinboard introduction on search', function () {
      searchPage.input.waitForDisplayed();
      searchPage.input.setValue('Ke');

      searchPage.pinboardIntroduction.body.waitForDisplayed(1000, true);
    });

    it('should display introduction after clear search input', function () {
      searchPage.input.waitForDisplayed();
      searchPage.input.setValue('Ke');

      searchPage.clearSearchButton.click();
      searchPage.pinboardIntroduction.body.waitForDisplayed(1000);
    });

    it('should close pinboard introduction after click close', function () {
      searchPage.pinboardIntroduction.body.waitForDisplayed();
      searchPage.pinboardIntroduction.closeButton.click();
      searchPage.pinboardIntroduction.body.waitForDisplayed(1000, true);
      browser.refresh();
      searchPage.input.waitForDisplayed(1000);
      searchPage.pinboardIntroduction.body.waitForDisplayed(1000, true);
    });

    it('should close pinboard introduction and redirect to pinboard page after click Get Started', function () {
      searchPage.pinboardIntroduction.body.waitForDisplayed(INTRODUCTION_DISPLAY_TIMEOUT);
      searchPage.pinboardIntroduction.getStartedButton.click();
      browser.waitForUrl(url => url.should.match(/\/pinboard\/.*/), 2000);
      pinboardPage.searchBar.click();
      searchPage.input.waitForDisplayed(1000);
      searchPage.pinboardIntroduction.body.waitForDisplayed(INTRODUCTION_DISPLAY_TIMEOUT, true);
    });

    it('should not display pinboard introduction after user add item to pinboard', function () {
      searchPage.input.waitForDisplayed();
      searchPage.input.setValue('Ke');

      searchPage.secondOfficerResult.waitForDisplayed();
      searchPage.secondOfficerPinButton.click();
      searchPage.clearSearchButton.click();
      searchPage.pinboardButton.waitForText('Pinboard (1)');
      searchPage.pinboardIntroduction.body.waitForDisplayed(1000, true);
    });

    it('should display pinboard introduction after user remove all item from pinboard', function () {
      searchPage.input.waitForDisplayed();
      searchPage.input.setValue('Ke');

      searchPage.secondOfficerResult.waitForDisplayed();
      searchPage.secondOfficerPinButton.click();
      browser.pause(100);
      searchPage.secondOfficerPinButton.click();
      searchPage.clearSearchButton.click();
      searchPage.pinboardIntroduction.body.waitForDisplayed(1000);
      searchPage.pinboardButton.waitForDisplayed(1000, true);
    });

    context('lastest pinboard is not empty', function () {
      beforeEach(function () {
        setupMockApiFile('search-page/search-page-mock-non-empty-lastest-pinboard.js');
      });

      afterEach(function () {
        restoreMockApiFile();
      });

      it('should not display pinboard introduction when lasted pinboard is not empty', function () {
        searchPage.open();
        searchPage.input.waitForDisplayed();
        searchPage.pinboardIntroduction.body.waitForDisplayed(INTRODUCTION_DISPLAY_TIMEOUT, true);
      });
    });
  });

  context('PinButton introduction', function () {
    beforeEach(function () {
      browser.clearReduxStore(true);
      searchPage.input.waitForDisplayed();
    });

    context('search results', function () {
      context('search result have more than 3 items', function () {
        it('should display PinButtonIntroduction in third pinnable search result', function () {
          searchPage.input.setValue('intr');
          searchPage.unitOfficerResultsSection.thirdPinButtonIntroduction.waitForDisplayed();
          searchPage.unitOfficerResultsSection.pinButtonIntroduction.count.should.equal(1);
          searchPage.searchCommunityResultsSection.pinButtonIntroduction.count.should.equal(0);
          searchPage.trrResultsSection.pinButtonIntroduction.count.should.equal(0);
        });
      });

      context('search result have less than 3 items', function () {
        it('should display PinButtonIntroduction in last pinnable search result', function () {
          searchPage.input.setValue('Kelly');
          searchPage.officerResultsSection.firstPinButtonIntroduction.waitForDisplayed();
          searchPage.officerResultsSection.pinButtonIntroduction.count.should.equal(1);
          searchPage.investigatorCRResultsSection.pinButtonIntroduction.count.should.equal(0);
        });
      });

      it('should not display PinButtonIntroduction after click on PinButton have introduction', function () {
        searchPage.input.setValue('intr');
        const thirdPinbuttonIntroduction = searchPage.unitOfficerResultsSection.thirdPinButtonIntroduction;
        thirdPinbuttonIntroduction.waitForDisplayed(INTRODUCTION_DISPLAY_TIMEOUT + 500);
        searchPage.unitOfficerResultsSection.thirdPinButton.click();
        thirdPinbuttonIntroduction.waitForDisplayed(1000, true);
        browser.refresh();
        searchPage.input.setValue('intr');
        searchPage.unitOfficerResultsSection.firstPinButton.waitForDisplayed();
        browser.pause(INTRODUCTION_DISPLAY_TIMEOUT + 500);
        searchPage.unitOfficerResultsSection.thirdPinButtonIntroduction.waitForDisplayed(100, true);
      });

      it('should not display PinButtonIntroduction after click on any PinButton', function () {
        searchPage.input.setValue('intr');
        const thirdPinbuttonIntroduction = searchPage.unitOfficerResultsSection.thirdPinButtonIntroduction;
        thirdPinbuttonIntroduction.waitForDisplayed(INTRODUCTION_DISPLAY_TIMEOUT + 500);
        searchPage.unitOfficerResultsSection.firstPinButton.click();
        thirdPinbuttonIntroduction.waitForDisplayed(1000, true);
        browser.refresh();
        searchPage.input.setValue('intr');
        searchPage.unitOfficerResultsSection.firstPinButton.waitForDisplayed();
        browser.pause(INTRODUCTION_DISPLAY_TIMEOUT + 500);
        searchPage.unitOfficerResultsSection.thirdPinButtonIntroduction.waitForDisplayed(100, true);
      });

      it('should not display PinButtonIntroduction after click on result item have introduction', function () {
        searchPage.input.setValue('intr');
        const thirdPinbuttonIntroduction = searchPage.unitOfficerResultsSection.thirdPinButtonIntroduction;
        thirdPinbuttonIntroduction.waitForDisplayed(INTRODUCTION_DISPLAY_TIMEOUT + 500);
        searchPage.unitOfficerResultsSection.thirdResultText.click();
        thirdPinbuttonIntroduction.waitForDisplayed(1000, true);
        browser.refresh();
        searchPage.input.setValue('intr');
        searchPage.unitOfficerResultsSection.firstPinButton.waitForDisplayed();
        browser.pause(INTRODUCTION_DISPLAY_TIMEOUT + 500);
        searchPage.unitOfficerResultsSection.thirdPinButtonIntroduction.waitForDisplayed(100, true);
      });

      it('should not display PinButtonIntroduction after click on introduction message', function () {
        searchPage.input.setValue('intr');
        const thirdPinbuttonIntroduction = searchPage.unitOfficerResultsSection.thirdPinButtonIntroduction;
        thirdPinbuttonIntroduction.waitForDisplayed(INTRODUCTION_DISPLAY_TIMEOUT + 500);
        thirdPinbuttonIntroduction.click();
        thirdPinbuttonIntroduction.waitForDisplayed(1000, true);
        browser.refresh();
        searchPage.input.setValue('intr');
        searchPage.unitOfficerResultsSection.firstPinButton.waitForDisplayed();
        browser.pause(INTRODUCTION_DISPLAY_TIMEOUT + 500);
        searchPage.unitOfficerResultsSection.thirdPinButtonIntroduction.waitForDisplayed(100, true);
      });
    });

    context('recent section', function () {
      context('recent section have less than 3 items', function () {
        beforeEach(function () {
          performSearch('Ke');
          clickOnSearchResultItem(searchPage.firstCrResult, 'CR # CR123 • April 23, 2004');
          backToSearch();
          clickOnSearchResultItem(searchPage.firstTrrResult, 'Member Presence');
          backToSearch();
          searchPage.clearSearchButton.click();
          searchPage.input.waitForDisplayed();
        });

        it('should should PinButtonIntroduction on last recent search item', function () {
          searchPage.secondRecentIntroduction.waitForDisplayed(INTRODUCTION_DISPLAY_TIMEOUT + 500);
          searchPage.firstRecentIntroduction.isDisplayed().should.be.false();
        });
      });

      context('recent section have more than 3 items', function () {
        beforeEach(function () {
          performSearch('Ke');
          clickOnSearchResultItem(searchPage.firstOfficerResult, 'Bernadette Kelly', true);
          backToSearch();
          clickOnSearchResultItem(searchPage.firstCrResult, 'CR # CR123 • April 23, 2004');
          backToSearch();
          clickOnSearchResultItem(searchPage.firstTrrResult, 'Member Presence');
          backToSearch();
          searchPage.clearSearchButton.click();
          searchPage.input.waitForDisplayed();
        });

        it('should should PinButtonIntroduction on third recent search item', function () {
          searchPage.thirdRecentIntroduction.waitForDisplayed(INTRODUCTION_DISPLAY_TIMEOUT + 500);
          searchPage.firstRecentIntroduction.isDisplayed().should.be.false();
          searchPage.secondRecentIntroduction.isDisplayed().should.be.false();
        });

        it('should dismiss PinButtonIntroduction after click on third recent item', function () {
          searchPage.thirdRecentIntroduction.waitForDisplayed(INTRODUCTION_DISPLAY_TIMEOUT + 500);
          searchPage.thirdRecentIntroduction.click();
          searchPage.thirdRecentIntroduction.waitForDisplayed(1000, true);

          browser.refresh();
          browser.pause(INTRODUCTION_DISPLAY_TIMEOUT + 500);
          searchPage.thirdRecentIntroduction.waitForDisplayed(1000, true);
        });

        it('should show pinboard bar and hide pinboard intrduction after click PinButton', function () {
          searchPage.pinboardIntroduction.body.waitForDisplayed(1000);
          searchPage.pinboardBar.waitForDisplayed(1000, true);

          searchPage.firstRecentPinButton.click();
          searchPage.pinboardIntroduction.body.waitForDisplayed(1000, true);
          searchPage.pinboardBar.waitForDisplayed(1000);
          searchPage.pinboardButton.getText().should.equal('Pinboard (1)');
        });

        it('should hide pinboard bar and show pinboard introduction after remove PinButton', function () {
          searchPage.pinboardIntroduction.body.waitForDisplayed(1000);
          searchPage.pinboardBar.waitForDisplayed(1000, true);

          searchPage.firstRecentPinButton.click();
          searchPage.pinboardIntroduction.body.waitForDisplayed(1000, true);
          searchPage.pinboardBar.waitForDisplayed(1000);

          searchPage.firstRecentPinButton.click();
          searchPage.pinboardIntroduction.body.waitForDisplayed(1000);
          searchPage.pinboardBar.waitForDisplayed(1000, true);
        });
      });

      context('all 3 first recent item is unpinnable', function () {
        it('should display PinButtonIntroduction in first pinnable item', function () {
          performSearch('intr');
          searchPage.unitOfficerResultsSection.firstResultText.click();
          searchPage.unitOfficerResultsSection.firstResultText.click();
          backToSearch();

          searchPage.searchNeighborhoodResultsSection.firstResultText.click();
          browser.closeLastOpenedTab();

          searchPage.searchNeighborhoodResultsSection.secondResultText.click();
          searchPage.searchNeighborhoodResultsSection.secondResultText.click();
          browser.closeLastOpenedTab();
          searchPage.searchNeighborhoodResultsSection.thirdResultText.click();
          searchPage.searchNeighborhoodResultsSection.thirdResultText.click();
          browser.closeLastOpenedTab();
          searchPage.clearSearchButton.click();

          searchPage.forthRecentIntroduction.waitForDisplayed(
            INTRODUCTION_DISPLAY_TIMEOUT + 500
          );
        });
      });
    });
  });

  describe('should show the recent search', function () {
    beforeEach(function () {
      browser.clearReduxStore(true);
    });

    it('when click on result item', function () {
      performSearch('Geography');
      clickOnSearchResultItem(searchPage.firstSearchTermsResult, 'Geography - Communities', true);

      clearSearchInput();
      performSearch('Kelly');
      clickOnSearchResultItem(searchPage.firstInvestigatorCrResult, 'CR # CR123456 • April 23, 2004');

      backToSearch();
      clearSearchInput();
      performSearch('2004/04/23');
      clickOnSearchResultItem(searchPage.secondDateCrResult, 'CR # CR456 • April 23, 2004');
      backToSearch();
      clickOnSearchResultItem(searchPage.secondDateTrrResult, 'Physical Force - Holding');
      backToSearch();
      clickOnSearchResultItem(searchPage.firstDateOfficerResult, 'Jerome Finnigan');

      backToSearch();
      clearSearchInput();
      performSearch('Ke');
      clickOnSearchResultItem(searchPage.firstNeighborhoodResult, 'Kenwood');

      browser.switchWindow('/search/');
      clearSearchInput();
      performSearch('rank');
      clickOnSearchResultItem(searchPage.firstRankResult, 'Officer');

      clearSearchInput();
      performSearch('Ke');
      clickOnSearchResultItem(searchPage.firstOfficerResult, 'Bernadette Kelly', true);
      backToSearch();
      clickOnSearchResultItem(searchPage.firstCrResult, 'CR # CR123 • April 23, 2004');
      backToSearch();
      clickOnSearchResultItem(searchPage.firstTrrResult, 'Member Presence');

      backToSearch();
      clearSearchInput();

      const expectedRecentSuggestions = [
        'Member Presence\nTRR # 123 - April 27, 2004',
        'CR # CR123 • April 23, 2004',
        'Bernadette Kelly\n45-year-old, White, Male, 10 Complaints, 2 Sustained',
        'Officer\nRank',
        'Kenwood\nNeighborhood',
        'Jerome Finnigan\n42-year-old, White, Male, 20 Complaints, 0 Sustained',
        'Physical Force - Holding\nTRR # 456 - April 23, 2004',
        'CR # CR456 • April 23, 2004',
        'CR # CR123456 • April 23, 2004',
        'Geography - Communities\nSearch Terms',
      ];

      expectedRecentSuggestions.forEach((expectedText, index) => {
        searchPage.recentSuggestionItem(index + 1).getText().should.equal(expectedText);
      });
      searchPage.pinboardButton.waitForDisplayed(1000, true);

      browser.scroll(0, -2000);
      browser.pause(500);

      searchPage.firstRecentPinButton.click();
      searchPage.toast.waitForText(
        'TRR #123 categorized as Member Presence happened in Apr 27, 2004 added.' +
        '\nGo to pinboard'
      );
      searchPage.toast.waitForDisplayed(5000, true);

      searchPage.secondRecentPinButton.click();
      searchPage.toast.waitForText(
        'CR #CR123 categorized as Lockup Procedures happened in Apr 23, 2004 added.' +
        '\nGo to pinboard'
      );
      searchPage.toast.waitForDisplayed(5000, true);

      searchPage.thirdRecentPinButton.click();
      searchPage.toast.waitForText(
        'Police Officer Bernadette Kelly 45-year-old White Male, with 10 complaints, 2 sustained added.' +
        '\nGo to pinboard'
      );
      searchPage.toast.waitForDisplayed(5000, true);
      searchPage.pinboardButton.waitForDisplayed(2000);
      searchPage.pinboardButton.getText().should.eql('Pinboard (3)');

      searchPage.firstRecentPinButton.click();
      searchPage.toast.waitForText(
        'TRR #123 categorized as Member Presence happened in Apr 27, 2004 removed.' +
        '\nGo to pinboard'
      );
      searchPage.toast.waitForDisplayed(5000, true);

      searchPage.secondRecentPinButton.click();
      searchPage.toast.waitForText(
        'CR #CR123 categorized as Lockup Procedures happened in Apr 23, 2004 removed.' +
        '\nGo to pinboard'
      );
      searchPage.toast.waitForDisplayed(5000, true);

      searchPage.thirdRecentPinButton.click();
      searchPage.toast.waitForText(
        'Police Officer Bernadette Kelly 45-year-old White Male, with 10 complaints, 2 sustained removed.' +
        '\nGo to pinboard'
      );
      searchPage.toast.waitForDisplayed(5000, true);
      searchPage.pinboardButton.waitForDisplayed(1000, true);

      searchPage.open();

      const newExpectedRecentSuggestions = [
        'Member Presence\nTRR # 123 - April 27, 2009',
        'CR # CR123 • April 23, 2005',
        'Bernadette Kelly\n45-year-old, White, Male, 12 Complaints, 3 Sustained',
        'Officer\nRank',
        'Kenwood\nNeighborhood',
        'Jerome Finnigan\n42-year-old, White, Male, 22 Complaints, 2 Sustained',
        'Physical Force - Holding\nTRR # 456 - April 23, 2010',
        'CR # CR456 • April 23, 2006',
        'CR # CR123456 • April 23, 2007',
        'Geography - Communities\nSearch Terms',
      ];

      newExpectedRecentSuggestions.forEach((expectedText, index) => {
        searchPage.recentSuggestionItem(index + 1).getText().should.equal(expectedText);
      });
    });

    it('when hit enter on result item', function () {
      performSearch('Ke');
      searchPage.secondOfficerResult.waitForDisplayed();
      searchPage.secondOfficerResult.getText().should.containEql('John Kelly');
      browser.keys('ArrowDown');
      browser.keys('ArrowDown');
      browser.keys('Enter');

      backToSearch();
      clearSearchInput();

      searchPage.recentSuggestions.waitForDisplayed();
      searchPage.recentSuggestionItem(1).getText().should.equal(
        'John Kelly\n37-year-old, White, Female, 5 Complaints, 1 Sustained'
      );
    });
  });

  it('should not show the recent search if it is empty', function () {
    browser.execute(() => {
      window.localStorage.clear();
    });
    searchPage.open();

    searchPage.recentSuggestions.waitForDisplayed(20000, true);
  });

  it('should go back to landing page when user click on close button', function () {
    landingPage.open();
    landingPage.header.navBar.searchBox.mainElement.click();
    searchPage.backButton.waitForDisplayed();
    searchPage.backButton.click();
    searchPage.backButton.waitForDisplayed(20000, true);

    landingPage.currentBasePath.should.equal('/');
  });

  it('should go back to landing page when user hit ESCAPE with focus on search input', function () {
    landingPage.open();
    landingPage.header.navBar.searchBox.mainElement.click();
    searchPage.backButton.waitForDisplayed();
    browser.keys('Escape');
    browser.pause(500);

    landingPage.currentBasePath.should.equal('/');
  });

  it('should go back to pinboard page when user click on close button', function () {
    pinboardPage.open('abcd8765');
    pinboardPage.searchBar.click();
    searchPage.backButton.waitForDisplayed();
    searchPage.backButton.click();
    searchPage.backButton.waitForDisplayed(20000, true);

    browser.getUrl().should.match(/pinboard\/abcd8765\/pinboard-title\/$/);
  });

  it('should go back to pinboard page when user hit ESCAPE with focus on search input', function () {
    pinboardPage.open('abcd8765');
    pinboardPage.searchBar.click();
    searchPage.backButton.waitForDisplayed();
    browser.keys('Escape');
    searchPage.backButton.waitForDisplayed(20000, true);

    browser.getUrl().should.match(/pinboard\/abcd8765\/pinboard-title\/$/);
  });

  it('should follow the first link when user press enter after typing', function () {
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('Ke');

    searchPage.suggestionGroup.waitForDisplayed();
    searchPage.contentWrapper.waitForDisplayed();
    browser.keys('Enter');
    searchPage.currentBasePath.should.equal('/officer/1/bernadette-kelly/');
  });

  it('should go back to officer page when user click on close button', function () {
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('Ke');

    searchPage.secondOfficerResult.waitForDisplayed();
    searchPage.secondOfficerResult.click();
    browser.keys('Enter');
    searchPage.currentBasePath.should.equal('/officer/2/john-kelly/');

    backToSearch();
    searchPage.backButton.waitForDisplayed();
    searchPage.backButton.click();
    searchPage.backButton.waitForDisplayed(20000, true);

    browser.getUrl().should.match(/officer\/2\/john-kelly\/$/);
  });

  it('should go back to officer page when user hit ESCAPE with focus on search input', function () {
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('Ke');

    searchPage.secondOfficerResult.waitForDisplayed();
    searchPage.secondOfficerResult.click();
    browser.keys('Enter');
    searchPage.currentBasePath.should.equal('/officer/2/john-kelly/');

    backToSearch();
    searchPage.backButton.waitForDisplayed();
    browser.keys('Escape');
    searchPage.backButton.waitForDisplayed(20000, true);

    browser.getUrl().should.match(/officer\/2\/john-kelly\/$/);
  });

  it('should not follow the v1 url when user press enter and there is no results', function () {
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('noresult');

    searchPage.contentWrapper.waitForDisplayed();
    browser.pause(500);
    const url = browser.getUrl();
    browser.keys('Enter');
    browser.getUrl().should.equal(url);
  });

  it('should show save recent suggestions when user press Enter and there are results', function () {
    browser.execute(() => {
      window.localStorage.clear();
    });

    searchPage.open();
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('Ke');

    searchPage.suggestionGroup.waitForDisplayed();
    searchPage.contentWrapper.waitForDisplayed();
    browser.keys('Enter');

    searchPage.open();
    searchPage.recentSuggestionItem(1).getText().should.equal(
      'Bernadette Kelly\n45-year-old, White, Male, 10 Complaints, 2 Sustained'
    );
  });

  it('should navigates between the result when user press the navigation keys', function () {
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('Ke');

    searchPage.suggestionGroup.waitForDisplayed();
    searchPage.contentWrapper.waitForDisplayed();
    searchPage.firstOfficerResult.getAttribute('class').should.containEql('test--focused');
    searchPage.secondOfficerResult.getAttribute('class').should.not.containEql('test--focused');

    browser.keys('ArrowDown');
    browser.keys('ArrowDown');

    searchPage.firstOfficerResult.getAttribute('class').should.not.containEql('test--focused');
    searchPage.secondOfficerResult.getAttribute('class').should.containEql('test--focused');
  });

  it('should focus on More button after the last suggestion item when user press the navigation keys', function () {
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('Ke');

    searchPage.suggestionGroup.waitForDisplayed();
    searchPage.contentWrapper.waitForDisplayed();

    searchPage.firstLoadMoreButton.getAttribute('class').should.not.containEql('test--focused');

    times(6, () => browser.keys('ArrowDown'));

    searchPage.firstLoadMoreButton.getAttribute('class').should.containEql('test--focused');
  });

  it('should focus on the search box by default', function () {
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('Ke');

    browser.keys('T');

    searchPage.input.getValue().should.eql('KeT');
  });

  it('should follow the first result url when user hit ENTER', function () {
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('Ke');

    searchPage.firstOfficerResult.waitForDisplayed();
    browser.keys('Enter');

    searchPage.currentBasePath.should.eql('/officer/1/bernadette-kelly/');
  });

  it('should keep search results after coming back from other page', function () {
    searchPage.open();
    performSearch('Ke');
    clickOnSearchResultItem(searchPage.firstOfficerResult, 'Bernadette Kelly', true);

    backToSearch();
    searchPage.input.getValue().should.containEql('Ke');
    searchPage.suggestionGroup.waitForDisplayed();
    searchPage.suggestionTags.getText().should.containEql('OFFICER');
    searchPage.suggestionTags.getText().should.containEql('NEIGHBORHOOD');
    searchPage.firstOfficerResult.waitForDisplayed();
    searchPage.firstOfficerResult.getText().should.containEql('Bernadette Kelly');
  });

  it('should clear search results after coming back from landing page', function () {
    searchPage.open();
    performSearch('Ke');

    searchPage.backButton.click();
    landingPage.header.content.waitForDisplayed(1000);
    landingPage.header.navBar.searchBox.mainElement.waitForExist();
    landingPage.header.navBar.searchBox.mainElement.click();

    searchPage.input.waitForExist();
    searchPage.input.getValue().should.equal('');
  });

  context('After getting back to landing page', function () {
    beforeEach(function () {
      browser.setWindowRect(0, 0, 1000, 1000);
      landingPage.header.content.waitForExist();
      landingPage.header.content.waitForDisplayed(1000, true);
      searchPage.input.waitForDisplayed(1000);

      searchPage.backButton.click();

      landingPage.header.content.waitForDisplayed(1000);
      searchPage.input.waitForExist();
      searchPage.input.waitForDisplayed(1000, true);
    });

    it('should show search page and hide landing page when clicking on search box', function () {
      const searchBox = landingPage.header.navBar.searchBox;
      searchBox.mainElement.click();

      searchPage.input.waitForDisplayed(2000);
      landingPage.header.content.waitForDisplayed(2000, true);
      landingPage.header.content.waitForExist();
    });

    it('should expand search input when clicking on search box', function () {
      const SEARCH_INPUT_WIDTH_AFTER_EXPAND = 893;
      const searchBox = landingPage.header.navBar.searchBox;

      searchBox.mainElement.getCSSProperty('width').value.should.equal('512px');

      searchBox.mainElement.click();

      const beginningWidthString = searchPage.input.getCSSProperty('width').value;
      const beginningWidth = parseFloat(beginningWidthString.slice(0, beginningWidthString.length - 2));
      beginningWidth.should.aboveOrEqual(512).and.below(SEARCH_INPUT_WIDTH_AFTER_EXPAND);

      searchPage.input.waitForCSSProperty(
        'width',
        value => parseFloat(value.slice(0, value.length - 2)) === SEARCH_INPUT_WIDTH_AFTER_EXPAND,
        1000
      );
    });

    it('should move search box up when lading page position is top and clicking on search box', function () {
      const searchBox = landingPage.header.navBar.searchBox;
      searchBox.mainElement.click();

      browser.waitUntil(
        () => searchPage.input.getLocation('y') > 50,
        500,
        'Search box does not start moving up from lower position',
        10
      );

      const topYLocation = 9;
      browser.waitUntil(
        () => searchPage.input.getLocation('y') === topYLocation,
        1000,
        'Search box does not end moving up at top',
        10
      );
      searchPage.input.getLocation('y').should.equal(topYLocation);
    });

    it('should not move search page up when lading page is not at top', function () {
      browser.scroll(0, 500); // must scroll pass the top bar
      browser.pause(1000);

      const header = landingPage.header;
      header.content.getCSSProperty('position').value.should.eql('fixed');
      header.content.getCSSProperty('top').value.should.eql('-80px');
      header.navBar.searchBox.searchText.getCSSProperty('color').value.should.eql('rgba(118,118,118,1)');

      header.navBar.searchBox.mainElement.click();

      const topYLocation = 9;
      browser.pause(10);
      searchPage.input.getLocation('y').should.equal(topYLocation);
      browser.pause(10);
      searchPage.input.getLocation('y').should.equal(topYLocation);
      browser.pause(10);
      searchPage.input.getLocation('y').should.equal(topYLocation);

      searchPage.input.waitForCSSProperty(
        'width',
        value => parseFloat(value.slice(0, value.length - 2)) === 893,
        1000
      );
    });
  });

  describe('Search box button', function () {
    it('should clear the query when clicked', function () {
      searchPage.input.waitForDisplayed();
      searchPage.input.setValue('Ke');

      searchPage.clearSearchButton.waitForDisplayed();

      searchPage.clearSearchButton.click();
      searchPage.input.getValue().should.containEql('');
    });
  });

  describe('OfficerPreviewPane', function () {
    it('should render radar chart color correctly', function () {
      browser.setWindowRect(0, 0, 1000, 800);
      searchPage.input.waitForDisplayed();
      searchPage.input.setValue('Ke');
      searchPage.officerPreviewPaneSection.radarChart.waitForDisplayed();
      searchPage.officerPreviewPaneSection.radarChart
        .getCSSProperty('background-color').value.should.eql('rgba(245,37,36,1)');
    });

    it('should display gradient when window height is small', function () {
      browser.setWindowRect(0, 0, 1000, 800);
      searchPage.input.waitForDisplayed();
      searchPage.input.setValue('Ke');
      searchPage.clearSearchButton.waitForDisplayed();
      searchPage.firstOfficerResult.waitForDisplayed();

      searchPage.officerPreviewPaneSection.wrapper.waitForDisplayed();
      searchPage.officerPreviewPaneSection.gradient.waitForDisplayed();
    });

    it('should not display gradient when content is fully shown', function () {
      browser.setWindowRect(0, 0, 1000, 2400);
      searchPage.input.waitForDisplayed();
      searchPage.input.setValue('Ke');
      searchPage.clearSearchButton.waitForDisplayed();
      searchPage.firstOfficerResult.waitForDisplayed();
      searchPage.officerPreviewPaneSection.wrapper.waitForDisplayed();
      searchPage.officerPreviewPaneSection.gradient.waitForDisplayed(1000, true);
    });

    it('should redirect to officer profile when clicking on officer item', function () {
      searchPage.input.waitForDisplayed();
      searchPage.input.setValue('Ke');
      searchPage.firstNeighborhoodResult.waitForDisplayed();
      searchPage.firstNeighborhoodResult.click();

      searchPage.officerPreviewPaneSection.neighborhoodPane.waitForDisplayed();
      searchPage.officerPreviewPaneSection.listMostOfficers.count.should.eql(2);
      searchPage.officerPreviewPaneSection.listMostOfficers.click();
      browser.getUrl().should.match(/\/officer\/\d+\/[-a-z]+\/$/);
    });

    it('should go to data tool when click anywhere', function () {
      searchPage.input.waitForDisplayed();
      searchPage.input.setValue('Ke');
      searchPage.firstNeighborhoodResult.waitForDisplayed();
      searchPage.firstNeighborhoodResult.click();

      searchPage.officerPreviewPaneSection.neighborhoodPane.waitForDisplayed();
      searchPage.officerPreviewPaneSection.neighborhoodPane.click();
      browser.switchWindow('http://lvh.me/url-mediator/session-builder');
      browser.getUrl().should.eql('http://lvh.me/url-mediator/session-builder?neighborhood=SomeNeighborhood');
      browser.closeWindow();
      browser.switchWindow('localhost');
    });

    it('should redirect to officer page when click on view profile button', function () {
      searchPage.input.waitForDisplayed();
      searchPage.input.setValue('Ke');

      searchPage.officerPreviewPaneSection.viewOfficerButton.waitForDisplayed();
      searchPage.officerPreviewPaneSection.viewOfficerButton.click();
      browser.getUrl().should.match(/\/officer\/\d+\/[-a-z]+\/$/);
    });

    it('should add/remove officer to/from pinboard when click on pin button', function () {
      searchPage.input.waitForDisplayed();
      searchPage.input.setValue('Ke');

      searchPage.officerPreviewPaneSection.pinButton.waitForDisplayed();
      searchPage.pinboardButton.getText().should.eql('Your pinboard is empty');

      searchPage.officerPreviewPaneSection.pinButton.click();
      // Move the cursor away from the toast to prevent it from displaying forever
      searchPage.input.moveTo();

      searchPage.toast.waitForText(
        'Police Officer Bernadette Kelly 45-year-old White Male, with 10 complaints, 2 sustained added.' +
        '\nGo to pinboard'
      );
      searchPage.pinboardButton.getText().should.eql('Pinboard (1)');

      searchPage.toast.waitForDisplayed();
      searchPage.toast.waitForDisplayed(5000, true);

      searchPage.officerPreviewPaneSection.pinButton.click();
      searchPage.toast.waitForText(
        'Police Officer Bernadette Kelly 45-year-old White Male, with 10 complaints, 2 sustained removed.' +
        '\nGo to pinboard'
      );
      searchPage.pinboardButton.getText().should.eql('Your pinboard is empty');
    });

    it('should redirect to unit page when click on unit item on officer info widget', function () {
      searchPage.input.waitForDisplayed();
      searchPage.input.setValue('Ke');

      searchPage.officerPreviewPaneSection.unitItem.waitForDisplayed();
      searchPage.officerPreviewPaneSection.unitItem.click();
      browser.getUrl().should.match(/\/unit\/\d+\/$/);
    });
  });

  describe('RankPreviewPane', function () {
    it('should redirect to officer profile when clicking on officer item', function () {
      searchPage.input.waitForDisplayed();
      searchPage.input.setValue('rank');
      searchPage.rankResultsSection.firstResultText.waitForDisplayed();
      searchPage.rankResultsSection.firstResultText.click();

      searchPage.rankPreviewPaneSection.previewPane.waitForDisplayed();
      searchPage.rankPreviewPaneSection.listMostOfficers.count.should.eql(2);
      searchPage.rankPreviewPaneSection.firstOfficerRadarChart
        .getCSSProperty('background-color').value.should.eql('rgba(245,37,36,1)');
      searchPage.rankPreviewPaneSection.listMostOfficers.click();
      browser.getUrl().should.match(/\/officer\/\d+\/[-a-z]+\/$/);
    });
  });

  describe('CRPreviewPane', function () {
    beforeEach(function () {
      searchPage.input.waitForDisplayed();
      searchPage.input.setValue('CR only');
      searchPage.crResultsSection.firstResultText.waitForDisplayed();
      searchPage.crPreviewPaneSection.wrapper.waitForDisplayed();
    });

    it('should render enough content', function () {
      searchPage.crPreviewPaneSection.callToAction.getText().should.eql('View Complaint Record');
      searchPage.crPreviewPaneSection.title.getText().should.eql('Lockup Procedures');
      searchPage.crPreviewPaneSection.subtitle.getText().should.eql('Reports');
      searchPage.crPreviewPaneSection.incidentDate.getText().should.eql('APR 23, 2004');
      searchPage.crPreviewPaneSection.address.getText().should.eql('14XX W 63RD ST, CHICAGO IL 60636');
      searchPage.crPreviewPaneSection.victimText.getText().should.eql('VICTIMS');
      searchPage.crPreviewPaneSection.victims.count.should.eql(2);
      searchPage.crPreviewPaneSection.firstVictim.getText().should.eql('Hispanic, Female');
      searchPage.crPreviewPaneSection.secondVictim.getText().should.eql('Hispanic, Female, Age 48');
      searchPage.crPreviewPaneSection.accusedText.getText().should.eql('ACCUSED OFFICERS');
      searchPage.crPreviewPaneSection.accusedOfficers.count.should.eql(2);
      searchPage.crPreviewPaneSection.firstAccusedOfficerRadarChart
        .getCSSProperty('background-color').value.should.eql('rgba(245,37,36,1)');
    });

    it('should display gradient when window height is small', function () {
      browser.setWindowRect(0, 0, 1000, 500);
      searchPage.crPreviewPaneSection.gradient.waitForDisplayed();
    });

    it('should go to cr page when being clicked', function () {
      searchPage.crPreviewPaneSection.title.click();
      browser.getUrl().should.match(/\/complaint\/\w+\/$/);
    });

    it('should redirect to officer profile when clicking on officer item', function () {
      searchPage.crPreviewPaneSection.accusedOfficers.click();
      browser.getUrl().should.match(/\/officer\/\d+\/[-a-z]+\/$/);
    });
  });

  describe('TRRPreviewPane', function () {
    beforeEach(function () {
      searchPage.input.waitForDisplayed();
      searchPage.input.setValue('2004/04/23');
      searchPage.dateTRRResultsSection.firstResultText.waitForDisplayed();
      searchPage.dateTRRResultsSection.firstResultText.click();
      searchPage.trrPreviewPaneSection.wrapper.waitForDisplayed();
    });

    it('should render enough content', function () {
      searchPage.trrPreviewPaneSection.callToAction.getText().should.eql('View Tactical Response Report');
      searchPage.trrPreviewPaneSection.title.getText().should.eql('Taser');
      searchPage.trrPreviewPaneSection.incidentDate.getText().should.eql('Apr 23, 2004');
      searchPage.trrPreviewPaneSection.address.getText().should.eql('3000 Michigan Ave');
      searchPage.trrPreviewPaneSection.officerHeader.getText().should.eql('OFFICER');
      searchPage.trrPreviewPaneSection.officerLink.count.should.eql(1);
      searchPage.trrPreviewPaneSection.officerName.getText().should.equal('Jesse Pinkman');
      searchPage.trrPreviewPaneSection.officerAllegationCount.getText().should.equal('1 allegation');
      searchPage.trrPreviewPaneSection.firstOfficerAllegationRadarChart
        .getCSSProperty('background-color').value.should.eql('rgba(253,250,242,1)');
    });

    it('should go to trr page when being clicked', function () {
      searchPage.trrPreviewPaneSection.callToAction.click();
      browser.getUrl().should.match(/\/trr\/\w+\/$/);
    });

    it('should redirect to officer profile when clicking on officer item', function () {
      searchPage.trrPreviewPaneSection.officerLink.click();
      browser.getUrl().should.match(/\/officer\/\d+\/[-a-z]+\/$/);
    });
  });
});

describe('Search Page in edit mode', function () {
  beforeEach(function () {
    searchPage.openWithEditMode();
    searchPage.loginScreen.login();
  });

  it('should go to alias admin page when click on alias button of current item', function () {
    searchPage.input.setValue('Ke');
    searchPage.plusSign.waitForDisplayed();
    searchPage.plusSign.click();
    searchPage.input.setValue('Ke');
    searchPage.firstAliasButton.waitForDisplayed();
    searchPage.firstAliasButton.click();
    browser.getUrl().should.match(/\/edit\/search\/alias\/form\/$/);
  });
});

describe('Search Page with query parameter', function () {
  it('should able to show INVESTIGATOR > CR results via query parameter', function () {
    searchPage.open('Kelly');
    searchPage.investigatorCRResultsSection.results.waitForDisplayed();
    searchPage.suggestionTags.getText().should.containEql('INVESTIGATOR > CR');
    searchPage.investigatorCRResultsSection.results.count.should.equal(2);
    searchPage.investigatorCRResultsSection.firstResultText.getText().should.equal('CR # CR123456 • April 23, 2004');
    searchPage.investigatorCRResultsSection.firstResultSubText.getText().should.equal(
      'an officer named Kelly caught the victim'
    );
    searchPage.investigatorCRResultsSection.secondResultText.getText().should.equal('CR # CR654321');
    searchPage.investigatorCRResultsSection.secondResultSubText.getText().should.equal('');
  });

  it('should able to show OFFICERS results via query parameter', function () {
    searchPage.open('officer:jerome');

    searchPage.officerResultsSection.results.waitForDisplayed();
    searchPage.suggestionTagCount().should.equal(4);
    searchPage.suggestionTag(1).getText().should.equal('OFFICER');
    searchPage.suggestionTag(2).getText().should.equal('COMMUNITY');
    searchPage.suggestionTag(3).getText().should.equal('CR');
    searchPage.suggestionTag(4).getText().should.equal('TRR');

    searchPage.officerResultsSection.resultsCount('OFFICER').should.equal(20);
    searchPage.officerResultsSection.firstResultText.getText().should.equal('Jerome Finnigan');
    searchPage.officerResultsSection.secondResultText.getText().should.equal('Edward May');
    searchPage.searchCommunityResultsSection.results.waitForDisplayed(500, true);
    searchPage.crResultsSection.results.waitForDisplayed(500, true);
    searchPage.trrResultsSection.results.waitForDisplayed(500, true);
  });

  it('should search with correct query using terms', function () {
    searchPage.openWithTerms('officer:jerome');

    searchPage.officerResultsSection.results.waitForDisplayed();
    searchPage.input.getValue().should.eql('officer:jerome');
    searchPage.officerResultsSection.resultsCount('OFFICER').should.equal(20);
    searchPage.officerResultsSection.firstResultText.getText().should.equal('Jerome Finnigan');
  });
});

describe('Search Page with pinboard functionalities', function () {
  beforeEach(function () {
    setupMockApiFile('search-page/search-page-mock-api.js');
  });

  afterEach(function () {
    restoreMockApiFile();
  });

  it('should display pinboard button with correct text when items are added/removed', function () {
    searchPage.open('Ke');
    searchPage.suggestionGroup.waitForDisplayed();
    searchPage.pinboardButton.getText().should.eql('Your pinboard is empty');

    searchPage.firstOfficerPinButton.click();
    searchPage.pinboardButton.getText().should.eql('Pinboard (1)');

    searchPage.firstOfficerPinButton.click();
    searchPage.pinboardButton.getText().should.eql('Your pinboard is empty');
  });

  context('when click on pinboard hint button in search result', function () {
    it('should redirect to pinboard page', function () {
      searchPage.open('Ke');
      searchPage.firstOfficerPinButton.click();
      searchPage.firstPinboardHintButton.waitForDisplayed();
      searchPage.firstPinboardHintButton.moveTo();
      searchPage.firstPinboardHintButton.click();
      browser.waitForUrl(url => url.should.match(/pinboard\/abcd5678\/untitled-pinboard\/$/), 1000);
    });
  });


  context('when click on pinboard hint button in recent section', function () {
    it('should redirect to pinboard page', function () {
      searchPage.open();
      performSearch('Ke');
      clickOnSearchResultItem(searchPage.firstOfficerResult, 'Bernadette Kelly', true);

      backToSearch();
      clickOnSearchResultItem(searchPage.firstCrResult, 'CR # CR123 • April 23, 2004');

      backToSearch();
      clickOnSearchResultItem(searchPage.firstTrrResult, 'Member Presence');
      backToSearch();
      clearSearchInput();
      searchPage.firstRecentPinButton.click();
      searchPage.firstPinboardHintButton.waitForDisplayed();
      searchPage.firstPinboardHintButton.moveTo();
      searchPage.firstPinboardHintButton.click();
      browser.waitForUrl(url => url.should.match(/pinboard\/abcd5678\/untitled-pinboard\/$/), 1000);
    });
  });

  context('when click on pinboard button', function () {
    it('should redirect to Pinboard page', function () {
      searchPage.open('Ke');
      searchPage.suggestionGroup.waitForDisplayed();

      searchPage.pinboardButton.click();
      browser.getUrl().should.match(/pinboard\/abcd5678\/untitled-pinboard\/$/);
    });
  });
});

describe('Search Page toast', function () {
  it('should display toast in few seconds when items are added/removed', function () {
    searchPage.open('Ke');

    searchPage.suggestionGroup.waitForDisplayed();
    searchPage.firstOfficerPinButton.click();

    searchPage.toast.waitForDisplayed();
    searchPage.toast.waitForText(
      'Police Officer Bernadette Kelly 45-year-old White Male, with 10 complaints, 2 sustained added.' +
        '\nGo to pinboard'
    );
    browser.pause(1500);

    searchPage.toast.waitForDisplayed(5000, true);

    searchPage.firstOfficerPinButton.click();
    searchPage.toast.waitForDisplayed();
    searchPage.toast.waitForText(
      'Police Officer Bernadette Kelly 45-year-old White Male, with 10 complaints, 2 sustained removed.' +
        '\nGo to pinboard'
    );
  });

  context('create new pinboard', function () {
    it('should go to pinboard detail page when clicking on success added toast', function () {
      searchPage.open('Ke');

      searchPage.suggestionGroup.waitForDisplayed();
      searchPage.firstOfficerPinButton.click();

      searchPage.toast.waitForDisplayed();
      searchPage.toast.waitForText(
        'Police Officer Bernadette Kelly 45-year-old White Male, with 10 complaints, 2 sustained added.' +
        '\nGo to pinboard'
      );
      searchPage.toast.click();
      browser.getUrl().should.match(/pinboard\/e25aa777\/untitled-pinboard\/$/);
      pinboardPage.pinnedSection.officers.officerCards().should.have.length(1);
    });

    it('should go to pinboard detail page when clicking on error added toast', function () {
      searchPage.open('Ke');

      searchPage.suggestionGroup.waitForDisplayed();
      searchPage.secondOfficerPinButton.click();

      searchPage.toast.waitForDisplayed();
      searchPage.toast.waitForText(
        'Police Officer John Kelly 37-year-old White Female, with 5 complaints, 1 sustained added.' +
        '\nGo to pinboard'
      );
      searchPage.toast.click();
      browser.getUrl().should.match(/pinboard\/$/);
      browser.waitForUrl(url => url.should.match(/pinboard\/e25aa888\/untitled-pinboard\/$/), 2500);
      pinboardPage.pinnedSection.officers.title.waitForDisplayed();
      pinboardPage.pinnedSection.officers.officerCards().should.have.length(1);
    });

    it('should go to pinboard detail page when clicking on long api call added toast', function () {
      searchPage.open('Ke');

      searchPage.suggestionGroup.waitForDisplayed();
      searchPage.thirdOfficerPinButton.click();

      searchPage.toast.waitForDisplayed();
      searchPage.toast.waitForText(
        'Police Officer Edward may 33-year-old White Female, with 8 complaints, 2 sustained added.' +
        '\nGo to pinboard'
      );
      searchPage.toast.click();
      browser.getUrl().should.match(/pinboard\/$/);
      browser.waitForUrl(url => url.should.match(/pinboard\/e25aa999\/untitled-pinboard\/$/), 1500);
      pinboardPage.pinnedSection.officers.officerCards().should.have.length(1);
    });
  });

  context('update current pinboard', function () {
    it('should go to pinboard detail page when clicking on success removed toast', function () {
      pinboardPage.open('abcd5678');
      pinboardPage.pinnedSection.officers.officerCards().should.have.length(1);

      pinboardPage.searchBar.click();
      searchPage.input.setValue('Ke');

      searchPage.suggestionGroup.waitForDisplayed();
      searchPage.firstOfficerPinButton.click();
      searchPage.toast.waitForDisplayed();
      searchPage.toast.waitForText(
        'Police Officer Bernadette Kelly 45-year-old White Male, with 10 complaints, 2 sustained removed.' +
        '\nGo to pinboard'
      );

      searchPage.toast.click();
      browser.getUrl().should.match(/pinboard\/abcd5678\/pinboard-title\/$/);
      pinboardPage.pinnedSection.officers.officerCards().should.have.length(0);
    });

    it('should go to pinboard detail page when clicking on error added toast', function () {
      pinboardPage.open('abcd8765');
      pinboardPage.pinnedSection.officers.officerCards().should.have.length(1);

      pinboardPage.searchBar.click();
      searchPage.input.setValue('Ke');

      searchPage.suggestionGroup.waitForDisplayed();
      searchPage.secondOfficerPinButton.click();
      searchPage.toast.waitForDisplayed();
      searchPage.toast.waitForText(
        'Police Officer John Kelly 37-year-old White Female, with 5 complaints, 1 sustained added.' +
        '\nGo to pinboard'
      );

      searchPage.toast.click();
      browser.getUrl().should.match(/pinboard\/abcd8765\/pinboard-title\/$/);
      pinboardPage.pinnedSection.officers.title.waitForDisplayed();
      pinboardPage.pinnedSection.officers.officerCards().should.have.length(2);
    });

    it('should go to pinboard detail page when clicking on long api call added toast ', function () {
      pinboardPage.open('dcab5678');
      pinboardPage.pinnedSection.officers.officerCards().should.have.length(1);

      pinboardPage.searchBar.click();
      searchPage.input.setValue('Ke');

      searchPage.suggestionGroup.waitForDisplayed();
      searchPage.thirdOfficerPinButton.click();
      searchPage.toast.waitForDisplayed();
      searchPage.toast.waitForText(
        'Police Officer Edward may 33-year-old White Female, with 8 complaints, 2 sustained added.' +
        '\nGo to pinboard'
      );

      searchPage.toast.click();
      browser.pause(2500);
      browser.getUrl().should.match(/pinboard\/dcab5678\/pinboard-title\/$/);
      pinboardPage.pinnedSection.officers.officerCards().should.have.length(2);
    });
  });
});
