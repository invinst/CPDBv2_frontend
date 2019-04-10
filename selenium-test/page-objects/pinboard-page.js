import Page from './page';
import Section from './sections/section';


class AnimatedSocialGraphSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      title: '(//div[contains(@class, "sidenav-title")])',
      coaccusalsThresholdText: '(//p[contains(@class, "coaccusals-threshold-text")])',
      toggleTimelineButton: '(//button[contains(@class, "toggle-timeline-btn")])',
      searchInput: '(//input[contains(@class, "graph-search-input")])',
      searchButton: '(//button[contains(@class, "graph-search-btn")])',
      startDate: '(//div[contains(@class, "start-date-label")])',
      endDate: '(//div[contains(@class, "end-date-label")])',
      currentDate: '(//span[contains(@class, "current-date-label")])',
      timelineSlider: '(//div[contains(@class, "test--timeline-slider")])',
      firstSearchResultSuggestion: '(//div[@class="graph-search-input-container"]//div//div)',
      biggestGraphNode: '(//*[@r="7"])',
    });
  }

  graphNodes() {
    return browser.elements('(//*[@class="node"])').value;
  }

  graphLinks() {
    return browser.elements('(//*[contains(@class, "link")])').value;
  }
}


class BaseComplaintCardSection extends Section {
  constructor(parent) {
    super();

    this.rootSelector = `//div[contains(@class, "${parent}")]`;
    this.mainElementSelector = `(${this.rootSelector}//div[contains(@class, "base-complaint-card")])`;

    this.prepareElementGetters({
      mainElement: this.mainElementSelector,
      leftHalf: `(${this.mainElementSelector}//div[contains(@class, "left-half")])`,
      rightHalf: `(${this.mainElementSelector}//div[contains(@class, "right-half")])`,
      thumbnail: `(${this.mainElementSelector}//div[contains(@class, "document-card-thumbnail")])`,
      plusButton: `(${this.mainElementSelector}//div[contains(@class, "plus-button")])`,
      incidentDate: `(${this.mainElementSelector}//div[contains(@class, "incident-date")])`,
      category: `(${this.mainElementSelector}//div[contains(@class, "category")])`,
      topOfficers: `(${this.mainElementSelector}//div[contains(@class, "top-officers")])`,
      remainingOfficers: `(${this.mainElementSelector}//div[contains(@class, "remaining-officers")])`,
      remainingOfficerToken: `(${this.mainElementSelector}//div[contains(@class, "mini-officer-visual-token")])`,
      notShowingOfficerCount: `(${this.mainElementSelector}//div[contains(@class, "not-showing-officer-count")])`,
    });
  }
}

class CoaccusalCardSection extends Section {
  constructor(parent) {
    super();

    this.rootSelector = `//div[contains(@class, "${parent}")]`;
    this.mainElementSelector = `(${this.rootSelector}//div[contains(@class, "relevant-coaccusal-card")])`;

    this.prepareElementGetters({
      mainElement: this.mainElementSelector,
      plusButton: `(${this.mainElementSelector}//div[contains(@class, "plus-button")])`,
      radarChart: `(${this.mainElementSelector}//div[contains(@class, "radar-chart-wrapper")])`,
      officerRank: `(${this.mainElementSelector}//div[contains(@class, "officer-card-rank")])`,
      officerName: `(${this.mainElementSelector}//div[contains(@class, "officer-card-name")])`,
      coaccusalCount: `(${this.mainElementSelector}//div[contains(@class, "coaccusal-count")])`,
    });
  }
}


class RelevantDocumentsSection extends Section {
  documentCardSection = new BaseComplaintCardSection('relevant-documents');

  constructor() {
    super();

    this.prepareElementGetters({
      title: '(//div[contains(@class, "relevant-documents")]' +
        '//div[contains(@class, "relevant-infinite-carousel-title")])',
    });
  }
}

class RelevantComplaintsSection extends Section {
  complaintCardSection = new BaseComplaintCardSection('.relevant-complaints');

  constructor() {
    super();

    this.prepareElementGetters({
      title: '(//div[contains(@class, "relevant-complaints")]' +
        '//div[contains(@class, "relevant-infinite-carousel-title")])',
    });
  }
}



class RelevantCoaccusalsSection extends Section {
  coaccusalCardSection = new CoaccusalCardSection('relevant-coaccusals');

  constructor() {
    super();

    this.prepareElementGetters({
      title: '(//div[contains(@class, "relevant-coaccusals")]' +
        '//div[contains(@class, "relevant-infinite-carousel-title")])',
    });
  }
}

class PinboardSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      title: '(//div[contains(@class, "pinboard-title")])',
      description: '(//div[contains(@class, "pinboard-description")])',
    });
  }
}

class PinboardPage extends Page {
  pinboardSection = new PinboardSection();
  animatedSocialGraphSection = new AnimatedSocialGraphSection();
  relevantDocumentsSection = new RelevantDocumentsSection();
  relevantCoaccusalsSection = new RelevantCoaccusalsSection();
  relevantComplaintsSection = new RelevantComplaintsSection();

  open() {
    super.open('/pinboard/5cd06f2b/pinboard-title/');
    browser.element('body').waitForVisible();
  }
}

module.exports = new PinboardPage();
