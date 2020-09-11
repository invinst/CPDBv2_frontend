'use strict';

import Page from './page';
import Section from './sections/section';


class LawsuitPreviewPaneSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      wrapper: '//div[starts-with(@class, "preview-pane")]',
      title: '//div[contains(@class, "lawsuit-title")]',
      firstOfficerRadarChart: '//div[starts-with(@class, "preview-pane")]' +
        '//ul//*[name()="svg" and contains(@class, "lawsuit")]',
      listOfficers: '//*[starts-with(@class, "preview-pane")]//*[contains(@class,"list-widget-item")]',
      showMoreButton: '//div[contains(@class, "list-widget-collapse")]',
    });
  }
}

class OfficerPreviewPaneSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      wrapper: '//div[starts-with(@class, "preview-pane")]',
      gradient: '.test--gradient',
      communityPane: '.test--preview-pane-community',
      neighborhoodPane: '.test--preview-pane-neighborhood',
      listMostOfficers: '//*[starts-with(@class, "preview-pane")]//*[contains(@class,"list-widget-item")]',
      previewPane: '//div[starts-with(@class, "preview-pane")]',
      pinButton: '//div[starts-with(@class, "preview-pane")]//*[contains(@class,"pin-button")]',
      viewOfficerButton: '.view-officer-profile-button',
      unitItem: 'li.has-link',
      radarChart: '//div[starts-with(@class, "preview-pane")]//*[name()="svg" and contains(@class, "radar")]',
    });
  }
}

class RankPreviewPaneSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      previewPane: '//div[starts-with(@class, "preview-pane")]',
      firstOfficerRadarChart: '//div[starts-with(@class, "preview-pane")]' +
        '//ul//*[name()="svg" and contains(@class, "radar")]',
      listMostOfficers: '//*[starts-with(@class, "preview-pane")]//*[contains(@class,"list-widget-item")]',
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
      accusedOfficers: '//*[contains(@class, "list-widget-item")]',
      firstAccusedOfficerRadarChart: '//div[starts-with(@class, "preview-pane")]' +
        '//ul//*[name()="svg" and contains(@class, "radar")]',
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
      officerLink: '//*[contains(@class, "list-widget-item")]',
      officerName: '.list-widget-list-item-name',
      officerAllegationCount: '.list-widget-list-item-count',
      firstOfficerAllegationRadarChart: '//div[starts-with(@class, "preview-pane")]' +
        '//ul//*[name()="svg" and contains(@class, "radar")]',
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
      thirdResultText: `(//a[contains(@class, "suggestion-item-${key}")]
        //div[contains(@class, "test--first-row")])[3]`,
      secondResultSubText: `(//a[contains(@class, "suggestion-item-${key}")]
        //div[contains(@class, "test--second-row")])[2]`,
      previewPaneTitle: '(//div[@class="test--preview-pane-title"])',
      previewPaneButton: '(//a[@class="test--call-to-action"])',
      firstPinButton: `(//a[contains(@class, "suggestion-item-${key}")]` +
        '//div[contains(@class, "item-pin-button__item-pin-button")])[1]',
      thirdPinButton: `(//a[contains(@class, "suggestion-item-${key}")]` +
        '//div[contains(@class, "item-pin-button__item-pin-button")])[3]',
      pinButtonIntroduction: `//a[contains(@class, "suggestion-item-${key}")]` +
        '//div[contains(@class, "pin-button-introduction")]',
      firstPinButtonIntroduction: `//a[contains(@class, "suggestion-item-${key}")][1]` +
        '//div[contains(@class, "pin-button-introduction")]',
      secondPinButtonIntroduction: `//a[contains(@class, "suggestion-item-${key}")][2]` +
        '//div[contains(@class, "pin-button-introduction")]',
      thirdPinButtonIntroduction: `//a[contains(@class, "suggestion-item-${key}")][3]` +
        '//div[contains(@class, "pin-button-introduction")]',
    });
  }

  resultsCount(key) {
    return $$(`//a[contains(@class, "suggestion-item-${key}")]`).length;
  }
}

class PinboardIntroduction extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      body: '//div[contains(@class, "pinboard-introduction")]',
      closeButton: '.introduction-close-btn',
      getStartedButton: '.get-started-btn',
    });
  }
}

class SearchPage extends Page {
  lawsuitPreviewPaneSection = new LawsuitPreviewPaneSection();
  officerPreviewPaneSection = new OfficerPreviewPaneSection();
  rankPreviewPaneSection = new RankPreviewPaneSection();
  crPreviewPaneSection = new CRPreviewPaneSection();
  trrPreviewPaneSection = new TRRPreviewPaneSection();
  dateCRResultsSection = new ResultsSection('DATE-CR');
  unitOfficerResultsSection = new ResultsSection('UNIT-OFFICERS');
  unitResultsSection = new ResultsSection('UNIT');
  investigatorCRResultsSection = new ResultsSection('INVESTIGATOR-CR');
  dateTRRResultsSection = new ResultsSection('DATE-TRR');
  dateOfficerResultsSection = new ResultsSection('DATE-OFFICERS');
  officerResultsSection = new ResultsSection('OFFICER');
  crResultsSection = new ResultsSection('CR');
  lawsuitResultsSection = new ResultsSection('LAWSUIT');
  trrResultsSection = new ResultsSection('TRR');
  rankResultsSection = new ResultsSection('RANK');
  searchTermsResultsSection = new ResultsSection('SEARCH-TERMS');
  searchCommunityResultsSection = new ResultsSection('COMMUNITY');
  searchNeighborhoodResultsSection = new ResultsSection('NEIGHBORHOOD');
  pinboardIntroduction = new PinboardIntroduction();

  constructor() {
    super();
    this.prepareElementGetters({
      searchBreadcrumb: '//*[contains(@class, "breadcrumb-item")][2]',
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
        '//a[contains(@class, "suggestion-item-OFFICER-1")]//div[contains(@class, "item-pin-button__item-pin-button")]',
      secondOfficerPinButton:
        '//a[contains(@class, "suggestion-item-OFFICER-2")]//div[contains(@class, "item-pin-button__item-pin-button")]',
      thirdOfficerPinButton:
        '//a[contains(@class, "suggestion-item-OFFICER-3")]//div[contains(@class, "item-pin-button__item-pin-button")]',
      secondOfficerResult: '.test--suggestion-group .suggestion-item-OFFICER-2',
      firstNeighborhoodResult: '.test--suggestion-group .suggestion-item-NEIGHBORHOOD-1',
      secondNeighborhoodResult: '.test--suggestion-group .suggestion-item-NEIGHBORHOOD-2',
      firstCoAccusedResult: '.test--suggestion-group .suggestion-item-CO-ACCUSED-1',
      firstRankResult: '.test--suggestion-group .suggestion-item-RANK-Officer',
      searchHint: '.search-hint',
      firstLoadMoreButton: '(//div[contains(@class, "test--load-more-button")])[1]',
      secondLoadMoreButton: '(//div[contains(@class, "test--load-more-button")])[2]',
      plusSign: '(//div[contains(@class, "plus-sign-wrapper")])',
      firstAliasButton: '(//a[contains(@class, "test--create-alias-link")])[1]',
      pinboardButton: '.test--pinboard-button',
      pinboardBar: '//div[contains(@class, "pinboard-bar__wrapper")]',
      toast: '.Toastify__toast-body',
      firstCrResult: '.test--suggestion-group .suggestion-item-CR-CR123',
      secondDateCrResult: '.test--suggestion-group .suggestion-item-DATE-CR-CR456',
      firstLawsuitResult: '(//*[contains(@class, "test--suggestion-group")]' +
        ' //*[contains(@class, "suggestion-item-LAWSUIT")])[1]',
      secondLawsuitResult: '(//*[contains(@class, "test--suggestion-group")]' +
        ' //*[contains(@class, "suggestion-item-LAWSUIT")])[2]',
      firstTrrResult: '.test--suggestion-group .suggestion-item-TRR-123',
      secondDateTrrResult: '.test--suggestion-group .suggestion-item-DATE-TRR-456',
      firstDateOfficerResult: '.test--suggestion-group .suggestion-item-DATE-OFFICERS-123',
      firstInvestigatorCrResult: '.test--suggestion-group .suggestion-item-INVESTIGATOR-CR-CR123456',
      firstSearchTermsResult: '.test--suggestion-group .suggestion-item-SEARCH-TERMS-community',
      firstRecentPinButton:
        '(//a[contains(@class, "with-pinnable-item__suggestion-item")])[1]' +
        '//div[contains(@class, "item-pin-button__item-pin-button")]',
      secondRecentPinButton:
        '(//a[contains(@class, "with-pinnable-item__suggestion-item")])[2]' +
        '//div[contains(@class, "item-pin-button__item-pin-button")]',
      thirdRecentPinButton:
        '(//a[contains(@class, "with-pinnable-item__suggestion-item")])[3]' +
        '//div[contains(@class, "item-pin-button__item-pin-button")]',
      firstRecentIntroduction:
        '(//a[contains(@class, "with-pinnable-item__suggestion-item")])[1]' +
        '//div[contains(@class, "pin-button-introduction")]',
      secondRecentIntroduction:
        '(//a[contains(@class, "with-pinnable-item__suggestion-item")])[2]' +
        '//div[contains(@class, "pin-button-introduction")]',
      thirdRecentIntroduction:
        '(//a[contains(@class, "with-pinnable-item__suggestion-item")])[3]' +
        '//div[contains(@class, "pin-button-introduction")]',
      forthRecentIntroduction:
        '(//a[contains(@class, "with-pinnable-item__suggestion-item")])[4]' +
        '//div[contains(@class, "pin-button-introduction")]',
      pinButtonIntroduction: '//div[@class="pin-button-introduction"]',
      firstPinboardHintButton: '(//*[@class="pin-action-hint"])[1]',
    });
  }

  recentSuggestionItem(index) {
    return $$(`(//div[contains(@class, "with-pinnable-item__two-rows-wrapper")])[${index}]`)[0];
  }

  open(query = '') {
    let result = '/search/';
    if (query) {
      result = `${result}?q=${query}`;
    }
    super.open(result);
  }

  openWithTerms(term) {
    super.open(`/search/?terms=${term}`);
  }

  openWithEditMode() {
    super.open('/edit/search/');
  }

  suggestionTag(index) {
    return $$(`//div[@class="suggestion-tags"]//span[${index}]`)[0];
  }

  suggestionTagCount() {
    return $$('//div[@class="suggestion-tags"]//span').length;
  }
}

module.exports = new SearchPage();
