'use strict';

import Page from './page';


class SearchPage extends Page {

  constructor() {
    super();
    this.prepareElementGetters({
      input: '.test--search-page-input',
      page: '.search-page',
      suggestionGroup: '.test--suggestion-group',
      suggestionTags: '.suggestion-tags span',
      contentWrapper: '.content-wrapper',
      recentSuggestions: '.recent-suggestions',
      backButton: '.searchbar__button--back',
      searchTermToggle: '.test--toggle-button',
      firstOfficerResult: '.test--suggestion-group .suggestion-item-OFFICER-1',
      secondOfficerResult: '.test--suggestion-group .suggestion-item-OFFICER-2',
      firstNeighborhoodResult: '.test--suggestion-group .suggestion-item-NEIGHBORHOOD-1',
      firstCoAccusedResult: '.test--suggestion-group .suggestion-item-CO-ACCUSED-1',
      searchHint: '.search-hint',
      loadMoreButton: '.test--load-more-button'
    });
  }

  open() {
    super.open('/search/');
    browser.element('body').waitForVisible();
  }
}

module.exports = new SearchPage();
