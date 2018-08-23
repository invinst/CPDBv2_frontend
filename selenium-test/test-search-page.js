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
    searchPage.crResultsSection.firstResultText.getText().should.equal('Lockup Procedures');
    searchPage.crResultsSection.firstResultSubText.getText().should.equal('CRID CR123 - April 23, 2004');
    searchPage.crResultsSection.secondResultText.getText().should.equal('Unknown');
    searchPage.crResultsSection.secondResultSubText.getText().should.equal('CRID CR456');

    searchPage.trrResultsSection.results.count.should.equal(2);
    searchPage.trrResultsSection.firstResultText.getText().should.equal('Member Presence');
    searchPage.trrResultsSection.firstResultSubText.getText().should.equal('TRRID 123 - April 27, 2004');
    searchPage.trrResultsSection.secondResultText.getText().should.equal('Unknown');
    searchPage.trrResultsSection.secondResultSubText.getText().should.equal('TRRID 456');
  });


  it('should able to show date > trr and date > cr results', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('2004/04/23');

    searchPage.suggestionTags.waitForVisible();
    searchPage.suggestionTags.getText().should.containEql('DATE > CR');
    searchPage.suggestionTags.getText().should.containEql('DATE > TRR');

    searchPage.dateCRResultsSection.results.count.should.equal(2);
    searchPage.dateCRResultsSection.firstResultText.getText().should.equal('Lockup Procedures');
    searchPage.dateCRResultsSection.firstResultSubText.getText().should.equal('CRID CR123 - April 23, 2004');
    searchPage.dateCRResultsSection.secondResultText.getText().should.equal('Unknown');
    searchPage.dateCRResultsSection.secondResultSubText.getText().should.equal('CRID CR456 - April 23, 2004');

    searchPage.dateTRRResultsSection.results.count.should.equal(2);
    searchPage.dateTRRResultsSection.firstResultText.getText().should.equal('Member Presence');
    searchPage.dateTRRResultsSection.firstResultSubText.getText().should.equal('TRRID 123 - April 23, 2004');
    searchPage.dateTRRResultsSection.secondResultText.getText().should.equal('Unknown');
    searchPage.dateTRRResultsSection.secondResultSubText.getText().should.equal('TRRID 456 - April 23, 2004');
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
    searchPage.currentBasePath.should.eql('/officer/2/');
  });

  it('should trigger officer summary page when click on co-accused then press Enter', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('Ke');

    searchPage.firstCoAccusedResult.waitForVisible();
    searchPage.firstCoAccusedResult.click();
    browser.keys('Enter');
    searchPage.currentBasePath.should.eql('/officer/1/');
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
    searchPage.currentBasePath.should.equal('/officer/1/');
  });

  it('should follow the v1 url when user press enter and there is no results', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('noresult');

    searchPage.contentWrapper.waitForVisible();
    browser.pause(500);
    browser.keys('Enter');
    switchToRecentTab();
    browser.getUrl().should.equal('http://cpdb.lvh.me/s/noresult');
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

    searchPage.currentBasePath.should.eql('/officer/1/');
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

  describe('PreviewPane', function () {
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
      searchPage.officerPreviewPaneSection.gradient.waitForVisible(2000, true);
    });

    it('should redirect to officer profile when clicking on officer item', function () {
      searchPage.input.waitForVisible();
      searchPage.input.setValue('Ke');
      searchPage.firstNeighborhoodResult.waitForVisible();
      searchPage.firstNeighborhoodResult.click();

      searchPage.officerPreviewPaneSection.neighborhoodPane.waitForVisible();
      searchPage.officerPreviewPaneSection.listMostOfficers.count.should.eql(2);
      searchPage.officerPreviewPaneSection.listMostOfficers.click();
      browser.getUrl().should.match(/\/officer\/\d+\/$/);
    });
  });
});


