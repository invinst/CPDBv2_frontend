'use strict';

require('should');

import searchPage from './page-objects/search-page';
import landingPage from './page-objects/landing-page';

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

    landingPage.currentBasePath.should.equal('/');
  });

  it('should go back to previous page when user hit ESCAPE with no focus on search input', function () {
    landingPage.open();
    searchPage.open();
    searchPage.searchHint.click(); // unfocus search input
    browser.keys('Escape');

    landingPage.currentBasePath.should.equal('/');
  });

  it('should go back to previous page when user hit ESCAPE with focus on search input', function () {
    landingPage.open();
    searchPage.open();
    browser.keys('Escape');

    landingPage.currentBasePath.should.equal('/');
  });
});
