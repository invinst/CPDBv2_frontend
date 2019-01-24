'use strict';

require('should');

import { times } from 'lodash';

import searchPage from './page-objects/search-page';
import landingPage from './page-objects/landing-page';
import { switchToRecentTab } from './utils';


describe('Landing Page to Search Page', function () {
  beforeEach(function () {
    landingPage.open();
  });

  it('should activate search page with correct query when user types anything from landing page', function () {
    browser.keys('foobar');
    searchPage.input.waitForVisible();
    landingPage.currentBasePath.should.equal('/search/');
    searchPage.input.getValue().should.containEql('foobar');
  });
});

describe('Search Page', function () {
  beforeEach(function () {
    searchPage.open();
  });

  it('should show result when user type in', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('Ke');

    searchPage.suggestionGroup.waitForVisible();
    searchPage.page.getText().should.containEql('OFFICER');
    searchPage.page.getText().should.containEql('NEIGHBORHOOD');
    searchPage.firstOfficerResult.waitForVisible();
    searchPage.firstOfficerResult.getText().should.containEql('Bernadette Kelly'); // officer name
    searchPage.firstOfficerResult.getText().should.containEql('45 year old, White, Male, '); // officer demographic
    searchPage.firstOfficerResult.getText().should.containEql('10 Complaints, '); // officer complaints
    searchPage.firstOfficerResult.getText().should.containEql('2 Sustained'); // officer sustained

    searchPage.firstNeighborhoodResult.waitForVisible();
    searchPage.firstNeighborhoodResult.getText().should.containEql('Kenwood'); // neighborhood
  });

  it('should able to show trr and cr results', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('Ke');

    searchPage.suggestionTags.waitForVisible();
    searchPage.suggestionTags.getText().should.containEql('CR');
    searchPage.suggestionTags.getText().should.containEql('TRR');

    searchPage.crResultsSection.results.count.should.equal(2);
    searchPage.crResultsSection.firstResultText.getText().should.equal('CR # CR123 - April 23, 2004');
    searchPage.crResultsSection.firstResultSubText.getText().should.equal('an officer named Kelly caught the victim');
    searchPage.crResultsSection.secondResultText.getText().should.equal('CR # CR456');
    searchPage.crResultsSection.secondResultSubText.getText().should.equal('');

    searchPage.trrResultsSection.results.count.should.equal(2);
    searchPage.trrResultsSection.firstResultText.getText().should.equal('Member Presence');
    searchPage.trrResultsSection.firstResultSubText.getText().should.equal('TRR # 123 - April 27, 2004');
    searchPage.trrResultsSection.secondResultText.getText().should.equal('Unknown');
    searchPage.trrResultsSection.secondResultSubText.getText().should.equal('TRR # 456');
  });

  it('should able to show INVESTIGATOR > CR results', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('Kelly');

    searchPage.suggestionTags.waitForVisible();
    searchPage.suggestionTags.getText().should.containEql('INVESTIGATOR > CR');

    searchPage.investigatorCRResultsSection.results.count.should.equal(2);
    searchPage.investigatorCRResultsSection.firstResultText.getText().should.equal('CR # CR123456 - April 23, 2004');
    searchPage.investigatorCRResultsSection.firstResultSubText.getText().should.equal(
      'an officer named Kelly caught the victim'
    );
    searchPage.investigatorCRResultsSection.secondResultText.getText().should.equal('CR # CR654321');
    searchPage.investigatorCRResultsSection.secondResultSubText.getText().should.equal('');
  });

  it('should able to show date > trr and date > cr results', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('2004/04/23');

    searchPage.suggestionTags.waitForVisible();
    searchPage.suggestionTags.getText().should.containEql('DATE > CR');
    searchPage.suggestionTags.getText().should.containEql('DATE > TRR');

    searchPage.dateCRResultsSection.results.count.should.equal(2);
    searchPage.dateCRResultsSection.firstResultText.getText().should.equal('CR # CR123 - April 23, 2004');
    searchPage.dateCRResultsSection.firstResultSubText.getText().should.equal('');
    searchPage.dateCRResultsSection.secondResultText.getText().should.equal('CR # CR456 - April 23, 2004');
    searchPage.dateCRResultsSection.secondResultSubText.getText().should.equal('');

    searchPage.dateTRRResultsSection.results.count.should.equal(2);
    searchPage.dateTRRResultsSection.firstResultText.getText().should.equal('Member Presence');
    searchPage.dateTRRResultsSection.firstResultSubText.getText().should.equal('TRR # 123 - April 23, 2004');
    searchPage.dateTRRResultsSection.secondResultText.getText().should.equal('Unknown');
    searchPage.dateTRRResultsSection.secondResultSubText.getText().should.equal('TRR # 456 - April 23, 2004');
  });

  it('should able to show DATE > OFFICERS results', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('2004/04/23');

    searchPage.suggestionTags.waitForVisible();
    searchPage.suggestionTags.getText().should.containEql('DATE > OFFICERS');
    searchPage.dateOfficerResultsSection.results.count.should.equal(2);
    searchPage.dateOfficerResultsSection.firstResultText.getText().should.equal('Jerome Finnigan');
    searchPage.dateOfficerResultsSection.firstResultSubText.getText().should.containEql('42 year old, White, Male,');
    searchPage.dateOfficerResultsSection.firstResultSubText.getText().should.containEql('20 Complaints');
    searchPage.dateOfficerResultsSection.firstResultSubText.getText().should.containEql('0 Sustained');

    searchPage.dateOfficerResultsSection.secondResultText.getText().should.equal('Edward May');
    searchPage.dateOfficerResultsSection.secondResultSubText.getText().should.containEql('48 year old, White, Male,');
    searchPage.dateOfficerResultsSection.secondResultSubText.getText().should.containEql('20 Complaints');
    searchPage.dateOfficerResultsSection.secondResultSubText.getText().should.containEql('0 Sustained');
  });

  it('should able to show RANK results', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('rank');

    searchPage.suggestionTags.waitForVisible();
    searchPage.rankResultsSection.results.count.should.equal(2);
    searchPage.rankResultsSection.firstResultText.getText().should.equal('Officer');
    searchPage.rankResultsSection.secondResultText.getText().should.equal('Chief');
  });

  it('should able to show SEARCH-TERMS results', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('Geography');

    searchPage.suggestionTags.waitForVisible();

    searchPage.searchTermsResultsSection.results.count.should.equal(1);
    searchPage.searchTermsResultsSection.firstResultText.getText().should.equal('Geography - Communities');
    searchPage.searchTermsResultsSection.firstResultText.click();
    searchPage.searchTermsResultsSection.previewPaneTitle.getText().should.containEql('Communities');
    searchPage.searchTermsResultsSection.previewPaneButton.getText().should.containEql('View ALL Communities');
    searchPage.searchTermsResultsSection.previewPaneButton.click();
    browser.pause(600);
    browser.getUrl().should.containEql('/search/?terms=community&type=COMMUNITY');
    searchPage.searchCommunityResultsSection.firstResultText.getText().should.equal('Austin');
  });

  it('should show filtered result when user clicks "Show more results"', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('Ke');

    searchPage.suggestionGroup.waitForVisible();
    searchPage.firstLoadMoreButton.click();
    searchPage.contentWrapper.waitForVisible();
    searchPage.contentWrapper.getText().should.containEql('OFFICER');
    searchPage.contentWrapper.getText().should.containEql('Bernadette Kelly');
    searchPage.contentWrapper.getText().should.containEql('Charles Kelly'); // another officer
    searchPage.contentWrapper.getText().should.not.containEql('NEIGHBORHOOD');
  });

  it('should show filtered result when user presses enter when focusing on "Show more results"', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('Ke');

    searchPage.suggestionGroup.waitForVisible();

    times(6, () => browser.keys('ArrowDown'));
    browser.keys('Enter');
    browser.pause(100);

    searchPage.contentWrapper.waitForVisible();
    const content = searchPage.contentWrapper.getText();
    content.should.containEql('OFFICER');
    content.should.containEql('Bernadette Kelly');
    content.should.containEql('Charles Kelly'); // another officer
    content.should.not.containEql('NEIGHBORHOOD');
  });

  it('should show filtered result when user select tag', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('Ke');

    searchPage.suggestionGroup.waitForVisible();
    searchPage.firstSuggestionTag.click();
    browser.pause(100);
    searchPage.contentWrapper.waitForVisible();
    const content = searchPage.contentWrapper.getText();
    content.should.containEql('OFFICER');
    content.should.containEql('Bernadette Kelly');
    content.should.containEql('Charles Kelly'); // another officer
    content.should.not.containEql('NEIGHBORHOOD');
  });

  it('should show DataTool suggestions when no result return', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('noresult');

    searchPage.contentWrapper.waitForVisible();
    searchPage.suggestionTags.waitForVisible();
    browser.pause(100);
    searchPage.contentWrapper.getText().should.containEql('DATA TOOL');
    searchPage.firstSuggestionTag.getText().should.containEql('Data Tool');
  });

  it('should trigger officer summary page when click on officer then press Enter', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('Ke');

    searchPage.secondOfficerResult.waitForVisible();
    searchPage.secondOfficerResult.click();
    browser.keys('Enter');
    searchPage.currentBasePath.should.eql('/officer/2/john-kelly/');
  });

  it('should trigger officer summary page when click on co-accused then press Enter', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('Ke');

    searchPage.firstCoAccusedResult.waitForVisible();
    searchPage.firstCoAccusedResult.click();
    browser.keys('Enter');
    searchPage.currentBasePath.should.eql('/officer/1/bernadette-kelly/');
  });

  it('should focus on clicked item', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('Ke');

    searchPage.suggestionGroup.waitForVisible();
    searchPage.secondOfficerResult.waitForVisible();

    searchPage.secondOfficerResult.getAttribute('class').should.not.containEql('test--focused');

    searchPage.secondOfficerResult.click();

    searchPage.secondOfficerResult.getAttribute('class').should.containEql('test--focused');
  });

  it('should focus on search result items correctly after changing to single content result page', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('Ke');

    searchPage.suggestionGroup.waitForVisible();
    searchPage.secondLoadMoreButton.waitForVisible();
    searchPage.secondLoadMoreButton.click();

    searchPage.secondLoadMoreButton.waitForVisible(1000, true);
    searchPage.secondNeighborhoodResult.waitForVisible();

    searchPage.secondNeighborhoodResult.getAttribute('class').should.not.containEql('test--focused');

    searchPage.secondNeighborhoodResult.click();

    searchPage.secondNeighborhoodResult.getAttribute('class').should.containEql('test--focused');
  });

  describe('should show the recent search', function () {
    beforeEach(function () {
      browser.execute(() => {
        window.localStorage.clear();
      });
      searchPage.open();

      searchPage.input.waitForVisible();
      searchPage.input.setValue('Ke');

      searchPage.firstOfficerResult.waitForVisible();
      searchPage.firstOfficerResult.getText().should.containEql('Bernadette Kelly');
    });

    it('when click on result item', function () {
      searchPage.firstOfficerResult.click();

      searchPage.open();
      searchPage.recentSuggestions.waitForVisible();
      searchPage.recentSuggestions.getText().should.containEql('Bernadette Kelly');
    });

    it('when hit enter on result item', function () {
      browser.keys('Enter');

      searchPage.open();
      searchPage.recentSuggestions.waitForVisible();
      searchPage.recentSuggestions.getText().should.containEql('Bernadette Kelly');
    });
  });

  it('should not show the recent search if it is empty', function () {
    browser.execute(() => {
      window.localStorage.clear();
    });
    searchPage.open();

    searchPage.recentSuggestions.waitForVisible(20000, true);
  });

  it('should go back to previous page when user click on back button', function () {
    landingPage.open();
    searchPage.open();
    searchPage.backButton.click();
    searchPage.backButton.waitForVisible(20000, true);

    landingPage.currentBasePath.should.equal('/');
  });

  it('should go back to previous page when user hit ESCAPE with focus on search input', function () {
    landingPage.open();
    searchPage.open();
    browser.keys('Escape');

    landingPage.currentBasePath.should.equal('/');
  });

  it('should follow the first link when user press enter after typing', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('Ke');

    searchPage.suggestionGroup.waitForVisible();
    searchPage.contentWrapper.waitForVisible();
    browser.keys('Enter');
    searchPage.currentBasePath.should.equal('/officer/1/bernadette-kelly/');
  });

  it('should not follow the v1 url when user press enter and there is no results', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('noresult');

    searchPage.contentWrapper.waitForVisible();
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
    searchPage.input.waitForVisible();
    searchPage.input.setValue('Ke');

    searchPage.suggestionGroup.waitForVisible();
    searchPage.contentWrapper.waitForVisible();
    browser.keys('Enter');

    searchPage.open();
    searchPage.recentSuggestions.waitForVisible();
    searchPage.recentSuggestions.getText().should.containEql('Bernadette Kelly');
  });

  it('should navigates between the result when user press the navigation keys', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('Ke');

    searchPage.suggestionGroup.waitForVisible();
    searchPage.contentWrapper.waitForVisible();
    searchPage.firstOfficerResult.getAttribute('class').should.containEql('test--focused');
    searchPage.secondOfficerResult.getAttribute('class').should.not.containEql('test--focused');

    browser.keys('ArrowDown');
    browser.keys('ArrowDown');

    searchPage.firstOfficerResult.getAttribute('class').should.not.containEql('test--focused');
    searchPage.secondOfficerResult.getAttribute('class').should.containEql('test--focused');
  });

  it('should focus on More button after the last suggestion item when user press the navigation keys', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('Ke');

    searchPage.suggestionGroup.waitForVisible();
    searchPage.contentWrapper.waitForVisible();

    searchPage.firstLoadMoreButton.getAttribute('class').should.not.containEql('test--focused');

    times(6, () => browser.keys('ArrowDown'));

    searchPage.firstLoadMoreButton.getAttribute('class').should.containEql('test--focused');
  });

  it('should focus on the search box by default', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('Ke');

    browser.keys('T');

    searchPage.input.getValue().should.eql('KeT');
  });

  it('should follow the first result url when user hit ENTER', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('Ke');

    searchPage.firstOfficerResult.waitForVisible();
    browser.keys('Enter');

    searchPage.currentBasePath.should.eql('/officer/1/bernadette-kelly/');
  });

  describe('Search box button', function () {
    it('should clear the query when clicked', function () {
      searchPage.input.waitForVisible();
      searchPage.input.setValue('Ke');

      searchPage.clearSearchButton.waitForVisible();

      searchPage.clearSearchButton.click();
      searchPage.input.getValue().should.containEql('');
    });

    it('should open search terms page when clicked', function () {
      searchPage.searchTermsToggle.getText().should.equal('What can I search?');
      searchPage.searchTermsToggle.click();
      searchPage.searchTermsToggle.getText().should.equal('Hide Search terms');
      browser.getUrl().should.match(/\/search\/terms\/$/);
      searchPage.searchTermsToggle.click();
      searchPage.searchTermsToggle.getText().should.equal('What can I search?');
      browser.getUrl().should.not.match(/\/search\/terms\/$/);
    });
  });

  describe('OfficerPreviewPane', function () {
    it('should display gradient when window height is small', function () {
      browser.setViewportSize({
        width: 1000,
        height: 800
      });
      searchPage.input.waitForVisible();
      searchPage.input.setValue('Ke');
      searchPage.clearSearchButton.waitForVisible();
      searchPage.firstOfficerResult.waitForVisible();

      searchPage.officerPreviewPaneSection.wrapper.waitForVisible();
      searchPage.officerPreviewPaneSection.gradient.waitForVisible();
    });

    it('should not display gradient when content is fully shown', function () {
      browser.setViewportSize({
        width: 1000,
        height: 1200
      });
      searchPage.input.waitForVisible();
      searchPage.input.setValue('Ke');
      searchPage.clearSearchButton.waitForVisible();
      searchPage.firstOfficerResult.waitForVisible();
      searchPage.officerPreviewPaneSection.wrapper.waitForVisible();
      searchPage.officerPreviewPaneSection.gradient.waitForVisible(1000, true);
    });

    it('should redirect to officer profile when clicking on officer item', function () {
      searchPage.input.waitForVisible();
      searchPage.input.setValue('Ke');
      searchPage.firstNeighborhoodResult.waitForVisible();
      searchPage.firstNeighborhoodResult.click();

      searchPage.officerPreviewPaneSection.neighborhoodPane.waitForVisible();
      searchPage.officerPreviewPaneSection.listMostOfficers.count.should.eql(2);
      searchPage.officerPreviewPaneSection.listMostOfficers.click();
      browser.getUrl().should.match(/\/officer\/\d+\/[\-a-z]+\/$/);
    });

    it('should go to data tool when click anywhere', function () {
      searchPage.input.waitForVisible();
      searchPage.input.setValue('Ke');
      searchPage.firstNeighborhoodResult.waitForVisible();
      searchPage.firstNeighborhoodResult.click();

      searchPage.officerPreviewPaneSection.neighborhoodPane.waitForVisible();
      searchPage.officerPreviewPaneSection.neighborhoodPane.click();
      switchToRecentTab();
      browser.getUrl().should.eql('http://lvh.me/url-mediator/session-builder?neighborhood=SomeNeighborhood');
    });
  });

  describe('RankPreviewPane', function () {
    it('should redirect to officer profile when clicking on officer item', function () {
      searchPage.input.waitForVisible();
      searchPage.input.setValue('rank');
      searchPage.rankResultsSection.firstResultText.waitForVisible();
      searchPage.rankResultsSection.firstResultText.click();

      searchPage.rankPreviewPaneSection.previewPane.waitForVisible();
      searchPage.rankPreviewPaneSection.listMostOfficers.count.should.eql(2);
      searchPage.rankPreviewPaneSection.listMostOfficers.click();
      browser.getUrl().should.match(/\/officer\/\d+\/[\-a-z]+\/$/);
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
    searchPage.plusSign.waitForVisible();
    searchPage.plusSign.click();
    searchPage.input.setValue('Ke');
    searchPage.firstAliasButton.waitForVisible();
    searchPage.firstAliasButton.click();
    browser.getUrl().should.match(/\/edit\/search\/alias\/form\/$/);
  });
});

describe('Search Page with query parameter', function () {
  it('should able to show INVESTIGATOR > CR results via query parameter', function () {
    browser.url('/search/?terms=Kelly');
    searchPage.investigatorCRResultsSection.results.waitForVisible();
    searchPage.suggestionTags.getText().should.containEql('INVESTIGATOR > CR');

    searchPage.investigatorCRResultsSection.results.count.should.equal(2);
    searchPage.investigatorCRResultsSection.firstResultText.getText().should.equal('CR # CR123456 - April 23, 2004');
    searchPage.investigatorCRResultsSection.firstResultSubText.getText().should.equal(
      'an officer named Kelly caught the victim'
    );
    searchPage.investigatorCRResultsSection.secondResultText.getText().should.equal('CR # CR654321');
    searchPage.investigatorCRResultsSection.secondResultSubText.getText().should.equal('');
  });
});
