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
      firstOfficerResult: '//*[@class="suggestion-group"]/*[text()="OFFICER"]/following-sibling::*/span[1]//a',
      firstCoAccusedResult: '//*[@class="suggestion-group"]/*[text()="CO-ACCUSED"]/following-sibling::*/span[1]//a',
      searchHint: '.search-hint'
    });
  }

  open() {
    super.open('/search/');
    browser.element('body').waitForVisible();
  }
}

module.exports = new SearchPage();
