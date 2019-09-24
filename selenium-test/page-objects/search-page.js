'use strict';

import Page from './page';
import Section from './sections/section';


class OfficerPreviewPaneSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      wrapper: '//div[starts-with(@class, "preview-pane")]',
      gradient: '.test--gradient',
      communityPane: '.test--preview-pane-community',
      neighborhoodPane: '.test--preview-pane-neighborhood',
      listMostOfficers: '//*[starts-with(@class, "preview-pane")]//*[contains(@class,"list-widget-item-link")]',
      previewPane: '//div[starts-with(@class, "preview-pane")]',
      pinButton: '.pin-button',
      viewOfficerButton: '.view-officer-profile-button',
      unitItem: 'li.has-link',
    });
  }
}

class RankPreviewPaneSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      previewPane: '//div[starts-with(@class, "preview-pane")]',
      listMostOfficers: '//*[starts-with(@class, "preview-pane")]//*[contains(@class,"list-widget-item-link")]',
    });
  }
}

class CRPreviewPaneSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      callToAction: '//div[contains(@class, "new-call-to-action-widget")]',
      wrapper: '//div[starts-with(@class, "preview-pane")]',
      gradient: '.widget-wrapper-gradient',
      title: '.cr-preview-pane-title-title',
      subtitle: '.cr-preview-pane-title-subtitle',
      previewPane: '//div[starts-with(@class, "preview-pane")]',
      incidentDate: '//div[@class="cr-preview-pane-info-row"][1]',
      address: '//div[contains(@class, "cr-preview-pane-address")]',
      victimText: '.cr-preview-pane-victims-text',
      victims: '//div[contains(@class, "demographic__demographic")]',
      firstVictim: '//div[contains(@class, "demographic__demographic")][1]',
      secondVictim: '//div[contains(@class, "demographic__demographic")][2]',
      accusedText: '.list-widget-header',
      accusedOfficers: '.list-widget-item-link',
    });
  }
}

class TRRPreviewPaneSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      callToAction: '//div[contains(@class, "new-call-to-action-widget")]',
      wrapper: '//div[starts-with(@class, "preview-pane")]',
      title: '.trr-preview-pane-title-title',
      incidentDate: '//div[@class="trr-preview-pane-info-row"][1]',
      address: '//div[@class="trr-preview-pane-info-row"][2]',
      officerHeader: '.list-widget-header',
      officerLink: '.list-widget-item-link',
      officerName: '.list-widget-list-item-name',
      officerAllegationCount: '.list-widget-list-item-count',
    });
  }
}

class ResultsSection extends Section {
  constructor(key) {
    super();
    this.prepareElementGetters({
      results: `//a[contains(@class, "suggestion-item-${key}")]`,
      firstResultText: `(//a[contains(@class, "suggestion-item-${key}")]
        //div[contains(@class, "test--first-row")])[1]`,
      firstResultSubText: `(//a[contains(@class, "suggestion-item-${key}")]
        //div[contains(@class, "test--second-row")])[1]`,
      secondResultText: `(//a[contains(@class, "suggestion-item-${key}")]
        //div[contains(@class, "test--first-row")])[2]`,
      secondResultSubText: `(//a[contains(@class, "suggestion-item-${key}")]
        //div[contains(@class, "test--second-row")])[2]`,
      previewPaneTitle: '(//div[@class="test--preview-pane-title"])',
      previewPaneButton: '(//a[@class="test--call-to-action"])',
    });
  }
}

class SearchPage extends Page {
  officerPreviewPaneSection = new OfficerPreviewPaneSection();
  rankPreviewPaneSection = new RankPreviewPaneSection();
  crPreviewPaneSection = new CRPreviewPaneSection();
  trrPreviewPaneSection = new TRRPreviewPaneSection();
  dateCRResultsSection = new ResultsSection('DATE-CR');
  investigatorCRResultsSection = new ResultsSection('INVESTIGATOR-CR');
  dateTRRResultsSection = new ResultsSection('DATE-TRR');
  dateOfficerResultsSection = new ResultsSection('DATE-OFFICERS');
  crResultsSection = new ResultsSection('CR');
  trrResultsSection = new ResultsSection('TRR');
  rankResultsSection = new ResultsSection('RANK');
  searchTermsResultsSection = new ResultsSection('SEARCH-TERMS');
  searchCommunityResultsSection = new ResultsSection('COMMUNITY');

  constructor() {
    super();
    this.prepareElementGetters({
      input: '.search-box-text-input',
      suggestionGroup: '.test--suggestion-group',
      suggestionTags: '.suggestion-tags',
      firstSuggestionTag: '.suggestion-tags span',
      contentWrapper: '.content-wrapper',
      recentSuggestions: '.recent-suggestions',
      backButton: '.searchbar__button--back',
      clearSearchButton: '.test--search-close-button',
      firstOfficerResult: '.test--suggestion-group .suggestion-item-OFFICER-1',
      firstOfficerPinButton:
        '//a[contains(@class, "suggestion-item-OFFICER-1")]//span[starts-with(@class, "item-pin-button")]',
      secondOfficerResult: '.test--suggestion-group .suggestion-item-OFFICER-2',
      firstNeighborhoodResult: '.test--suggestion-group .suggestion-item-NEIGHBORHOOD-1',
      secondNeighborhoodResult: '.test--suggestion-group .suggestion-item-NEIGHBORHOOD-2',
      firstCoAccusedResult: '.test--suggestion-group .suggestion-item-CO-ACCUSED-1',
      firstRankResult: '.test--suggestion-group .suggestion-item-RANK-1',
      searchHint: '.search-hint',
      firstLoadMoreButton: '(//div[contains(@class, "test--load-more-button")])[1]',
      secondLoadMoreButton: '(//div[contains(@class, "test--load-more-button")])[2]',
      plusSign: '(//div[contains(@class, "plus-sign-wrapper")])',
      firstAliasButton: '(//a[contains(@class, "test--create-alias-link")])[1]',
      pinboardButton: '.test--pinboard-button',
      pinboardBar: '//div[starts-with(@class, "pinboard-bar")]',
      toast: '.Toastify__toast-body',
    });
  }

  open(query = '') {
    let result = '/search/';
    if (query) {
      result = `${result}?terms=${query}`;
    }
    super.open(result);
  }

  openWithEditMode() {
    super.open('/edit/search/');
  }
}

module.exports = new SearchPage();
