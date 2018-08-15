'use strict';

import Page from './page';
import Section from './sections/section';


class OfficerPreviewPaneSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      wrapper: '.test--preview-pane',
      gradient: '.test--gradient',
      communityPane: '.test--preview-pane-community',
      neighborhoodPane: '.test--preview-pane-neighborhood',
      listMostOfficers: '//*[@class="test--preview-pane"]//*[contains(@class,"test--list-widget-item-link")]'
    });
  }
}

class CRResults extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      results: '//a[contains(@class, "suggestion-item-CR")]',
      firstResult: '(//a[contains(@class, "suggestion-item-CR")])[1]',
      secondResult: '(//a[contains(@class, "suggestion-item-CR")])[2]',
    });
  }
}

class TRRResults extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      results: '//a[contains(@class, "suggestion-item-TRR")]',
      firstResult: '(//a[contains(@class, "suggestion-item-TRR")])[1]',
      secondResult: '(//a[contains(@class, "suggestion-item-TRR")])[2]',
    });
  }
}


class SearchPage extends Page {
  officerPreviewPaneSection = new OfficerPreviewPaneSection();
  crResultsSection = new CRResults();
  trrResultsSection = new TRRResults();

  constructor() {
    super();
    this.prepareElementGetters({
      input: '.test--search-page-input',
      page: '.search-page',
      suggestionGroup: '.test--suggestion-group',
      suggestionTags: '.suggestion-tags',
      firstSuggestionTag: '.suggestion-tags span',
      contentWrapper: '.content-wrapper',
      recentSuggestions: '.recent-suggestions',
      backButton: '.searchbar__button--back',
      searchTermsToggle: '.test--toggle-button',
      clearSearchButton: '.test--search-close-button',
      firstOfficerResult: '.test--suggestion-group .suggestion-item-OFFICER-1',
      secondOfficerResult: '.test--suggestion-group .suggestion-item-OFFICER-2',
      firstNeighborhoodResult: '.test--suggestion-group .suggestion-item-NEIGHBORHOOD-1',
      secondNeighborhoodResult: '.test--suggestion-group .suggestion-item-NEIGHBORHOOD-2',
      firstCoAccusedResult: '.test--suggestion-group .suggestion-item-CO-ACCUSED-1',
      searchHint: '.search-hint',
      firstLoadMoreButton: '(//div[contains(@class, "test--load-more-button")])[1]',
      secondLoadMoreButton: '(//div[contains(@class, "test--load-more-button")])[2]',
    });
  }

  open() {
    super.open('/search/');
    browser.element('body').waitForVisible();
  }
}

module.exports = new SearchPage();
