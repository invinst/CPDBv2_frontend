'use strict';

import Page from './page';
import officerBottomSheet from './officer-summary-page';


class SearchPage extends Page {

  constructor() {
    super();
    this.officerBottomSheet = officerBottomSheet;
    this.prepareElementGetters({
      input: '//input',
      suggestionGroup: '.suggestion-group',
      suggestionTags: '.suggestion-tags span',
      rootElement: '#root',
      contentWrapper: '.content-wrapper',
      suggestionLink: '.suggestion-column a',
      recentSuggestions: '.recent-suggestions',
      backButton: '.searchbar__button--back',
      searchTermToggle: '.test--toggle-button',
      officerResults: '//*[@class="suggestion-group"]/*[text()="OFFICERS"]/following-sibling::*/span//a',
      firstOfficerResult: '//*[@class="suggestion-group"]/*[text()="OFFICERS"]/following-sibling::*/span[1]//a',
      firstCoAccusedResult: '//*[@class="suggestion-group"]/*[text()="CO-ACCUSED"]/following-sibling::*/span[1]//a',
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
