'use strict';

require('should');

import searchPage from './page-objects/search-page';
import landingPage from './page-objects/landing-page';

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
    searchPage.rootElement.waitForVisible();
    searchPage.contentWrapper.waitForVisible();
    searchPage.rootElement.getText().should.containEql('Officer');
    searchPage.rootElement.getText().should.containEql('Neighborhood');
    searchPage.contentWrapper.getText().should.containEql('Bernadette Kelly'); // officer name
    searchPage.contentWrapper.getText().should.containEql('7186'); // officer bdage
    searchPage.contentWrapper.getText().should.containEql('Kenwood'); // neighborhood
  });

  it('should show fewer results if there is not enough vertical space', function () {
    browser.setViewportSize({ width: 1280, height: 710 });
    searchPage.open();

    searchPage.input.waitForVisible();
    searchPage.input.setValue('Ke');

    searchPage.suggestionGroup.waitForVisible();
    searchPage.rootElement.waitForVisible();
    searchPage.contentWrapper.waitForVisible();
    searchPage.officerResults.count.should.eql(6);
  });

  it('should show filtered result when user clicks "Show more results"', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('Ke');

    searchPage.suggestionGroup.waitForVisible();
    searchPage.loadMoreButton.click();
    searchPage.contentWrapper.waitForVisible();
    searchPage.contentWrapper.getText().should.containEql('OFFICER');
    searchPage.contentWrapper.getText().should.containEql('Bernadette Kelly');
    searchPage.contentWrapper.getText().should.containEql('Charles Kelly'); // another officer
    searchPage.contentWrapper.getText().should.not.containEql('NEIGHBORHOOD');
  });

  it('should show filtered result when user select tag', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('Ke');

    searchPage.suggestionGroup.waitForVisible();
    searchPage.suggestionTags.click();
    searchPage.contentWrapper.waitForVisible();
    searchPage.contentWrapper.getText().should.containEql('OFFICER');
    searchPage.contentWrapper.getText().should.containEql('Bernadette Kelly');
    searchPage.contentWrapper.getText().should.containEql('Charles Kelly'); // another officer
    searchPage.contentWrapper.getText().should.not.containEql('NEIGHBORHOOD');
  });

  it('should show DataTool suggestions when no result return', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('noresult');

    searchPage.contentWrapper.waitForVisible();
    searchPage.suggestionTags.waitForVisible();
    searchPage.contentWrapper.getText().should.containEql('Data Tool');
    searchPage.suggestionTags.getText().should.containEql('Data Tool');
  });

  it('should trigger officer summary page when click on officer', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('Ke');

    searchPage.firstOfficerResult.waitForVisible();
    searchPage.firstOfficerResult.click();
    searchPage.currentBasePath.should.eql('/officer/1/');
  });

  it('should trigger officer summary page when click on co-accused', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('Ke');

    searchPage.firstCoAccusedResult.waitForVisible();
    searchPage.firstCoAccusedResult.click();
    searchPage.currentBasePath.should.eql('/officer/1/');
  });

  it('should show the recent search', function () {
    browser.execute(() => {
      window.localStorage.clear();
    });
    searchPage.open();

    searchPage.input.waitForVisible();
    searchPage.input.setValue('Ke');

    searchPage.suggestionGroup.waitForVisible();
    searchPage.contentWrapper.waitForVisible();
    searchPage.suggestionLink.waitForVisible();
    searchPage.contentWrapper.getText().should.containEql('Bernadette Kelly');
    searchPage.suggestionLink.click();

    searchPage.open();
    searchPage.recentSuggestions.waitForVisible();
    searchPage.recentSuggestions.getText().should.containEql('Bernadette Kelly');
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

  // should unskip this before PR
  it.skip('should go back to previous page when user hit ESCAPE with no focus on search input', function () {
    landingPage.open();
    searchPage.open();
    searchPage.searchHint.click(); // unfocus search input
    browser.debug();
    browser.keys('Escape');

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
    searchPage.rootElement.waitForVisible();
    searchPage.contentWrapper.waitForVisible();
    browser.keys('Enter');
    searchPage.currentBasePath.should.equal('/officer/1/');
  });

  it('should follow the v1 url when user press enter and there is no results', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('noresult');

    searchPage.rootElement.waitForVisible();
    searchPage.contentWrapper.waitForVisible();
    browser.keys('Enter');
    browser.getUrl().should.be.equal('http://cpdb.lvh.me/s/noresult');
  });

  it('should show save recent suggestions when user press Enter and there are results', function () {
    browser.execute(() => {
      window.localStorage.clear();
    });

    searchPage.open();
    searchPage.input.waitForVisible();
    searchPage.input.setValue('Ke');

    searchPage.suggestionGroup.waitForVisible();
    searchPage.rootElement.waitForVisible();
    searchPage.contentWrapper.waitForVisible();
    browser.keys('Enter');

    searchPage.open();
    searchPage.recentSuggestions.waitForVisible();
    searchPage.recentSuggestions.getText().should.containEql('Bernadette Kelly');
  });
});
