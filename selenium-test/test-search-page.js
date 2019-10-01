'use strict';

require('should');

import { times } from 'lodash';

import searchPage from './page-objects/search-page';
import landingPage from './page-objects/landing-page';


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
  });

  it('should show result when user type in', function () {
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('Ke');

    searchPage.suggestionGroup.waitForDisplayed();
    searchPage.page.getText().should.containEql('OFFICER');
    searchPage.page.getText().should.containEql('NEIGHBORHOOD');
    searchPage.firstOfficerResult.waitForDisplayed();
    searchPage.firstOfficerResult.getText().should.containEql('Bernadette Kelly'); // officer name
    searchPage.firstOfficerResult.getText().should.containEql('45 year old, White, Male, '); // officer demographic
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
    searchPage.crResultsSection.firstResultText.getText().should.equal('CR # CR123 - April 23, 2004');
    searchPage.crResultsSection.firstResultSubText.getText().should.equal('an officer named Kelly caught the victim');
    searchPage.crResultsSection.secondResultText.getText().should.equal('CR # CR456 - November 12, 2006');
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
    searchPage.investigatorCRResultsSection.firstResultText.getText().should.equal('CR # CR123456 - April 23, 2004');
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
    searchPage.dateCRResultsSection.firstResultText.getText().should.equal('CR # CR123 - April 23, 2004');
    searchPage.dateCRResultsSection.firstResultSubText.getText().should.equal('');
    searchPage.dateCRResultsSection.secondResultText.getText().should.equal('CR # CR456 - April 23, 2004');
    searchPage.dateCRResultsSection.secondResultSubText.getText().should.equal('');
    searchPage.crPreviewPaneSection.callToAction.getText().should.eql('View Complaint Record');

    searchPage.dateTRRResultsSection.results.count.should.equal(2);
    searchPage.dateTRRResultsSection.firstResultText.getText().should.equal('Member Presence');
    searchPage.dateTRRResultsSection.firstResultSubText.getText().should.equal('TRR # 123 - April 23, 2004');
    searchPage.dateTRRResultsSection.secondResultText.getText().should.equal('Unknown');
    searchPage.dateTRRResultsSection.secondResultSubText.getText().should.equal('TRR # 456 - April 23, 2004');
  });

  it('should able to show DATE > OFFICERS results', function () {
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('2004/04/23');

    searchPage.dateOfficerResultsSection.results.waitForDisplayed();
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
    browser.getUrl().should.containEql('/search/?terms=community&type=COMMUNITY');
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
    searchPage.crResultsSection.firstResultText.getText().should.equal('CR # CR123 - April 23, 2004');
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
    searchPage.crResultsSection.firstResultText.getText().should.equal('CR # CR123 - April 23, 2004');
    searchPage.crResultsSection.secondResultText.getText().should.equal('CR # CR456 - November 12, 2006');
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

  describe('should show the recent search', function () {
    beforeEach(function () {
      browser.execute(() => {
        window.localStorage.clear();
      });
      searchPage.open();

      searchPage.input.waitForDisplayed();
      searchPage.input.setValue('Ke');

      searchPage.firstOfficerResult.waitForDisplayed();
      searchPage.firstOfficerResult.getText().should.containEql('Bernadette Kelly');
    });

    it('when click on result item', function () {
      searchPage.firstOfficerResult.click();

      searchPage.open();
      searchPage.recentSuggestions.waitForDisplayed();
      searchPage.recentSuggestions.getText().should.containEql('Bernadette Kelly');
    });

    it('when hit enter on result item', function () {
      browser.keys('Enter');

      searchPage.open();
      searchPage.recentSuggestions.waitForDisplayed();
      searchPage.recentSuggestions.getText().should.containEql('Bernadette Kelly');
    });
  });

  it('should not show the recent search if it is empty', function () {
    browser.execute(() => {
      window.localStorage.clear();
    });
    searchPage.open();

    searchPage.recentSuggestions.waitForDisplayed(20000, true);
  });

  it('should go back to previous page when user click on back button', function () {
    landingPage.open();
    searchPage.open();
    searchPage.backButton.click();
    searchPage.backButton.waitForDisplayed(20000, true);

    landingPage.currentBasePath.should.equal('/');
  });

  it('should go back to previous page when user hit ESCAPE with focus on search input', function () {
    landingPage.open();
    searchPage.open();
    browser.keys('Escape');

    landingPage.currentBasePath.should.equal('/');
  });

  it('should follow the first link when user press enter after typing', function () {
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('Ke');

    searchPage.suggestionGroup.waitForDisplayed();
    searchPage.contentWrapper.waitForDisplayed();
    browser.keys('Enter');
    searchPage.currentBasePath.should.equal('/officer/1/bernadette-kelly/');
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
    searchPage.recentSuggestions.waitForDisplayed();
    searchPage.recentSuggestions.getText().should.containEql('Bernadette Kelly');
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

  describe('Search box button', function () {
    it('should clear the query when clicked', function () {
      searchPage.input.waitForDisplayed();
      searchPage.input.setValue('Ke');

      searchPage.clearSearchButton.waitForDisplayed();

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
  });

  describe('RankPreviewPane', function () {
    it('should redirect to officer profile when clicking on officer item', function () {
      searchPage.input.waitForDisplayed();
      searchPage.input.setValue('rank');
      searchPage.rankResultsSection.firstResultText.waitForDisplayed();
      searchPage.rankResultsSection.firstResultText.click();

      searchPage.rankPreviewPaneSection.previewPane.waitForDisplayed();
      searchPage.rankPreviewPaneSection.listMostOfficers.count.should.eql(2);
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
    searchPage.investigatorCRResultsSection.firstResultText.getText().should.equal('CR # CR123456 - April 23, 2004');
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
});
