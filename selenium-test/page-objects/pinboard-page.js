import Page from './page';
import Section from './sections/section';


class PinnedOfficers extends Section {
  constructor() {
    super();

    const sectionSelector = '//div[contains(@class, "test--OFFICER-section")]';
    const firstCardSelector = `(${sectionSelector}/div[@class="type-cards"]/div)[1]`;

    this.prepareElementGetters({
      title: `${sectionSelector}/div[@class="type-title"]`,
      firstCardUnpinBtn: `${firstCardSelector}/span[starts-with(@class, "item-unpin-button")]`,
      firstCardRank: `${firstCardSelector}//div[@class="officer-rank"]`,
      firstCardName: `${firstCardSelector}//div[@class="officer-name"]`,
      firstCardCRsCount: `${firstCardSelector}//div[@class="officer-complaints-count"]`,
    });
  }
}

class PinnedCRs extends Section {
  constructor() {
    super();

    const sectionSelector = '//div[contains(@class, "test--CR-section")]';
    const firstCardSelector = `(${sectionSelector}/div[@class="type-cards"]/div)[1]`;

    this.prepareElementGetters({
      title: `${sectionSelector}/div[@class="type-title"]`,
      firstCardUnpinBtn: `${firstCardSelector}/span[starts-with(@class, "item-unpin-button")]`,
      firstCardDate: `${firstCardSelector}//span[@class="location-card-date"]`,
      firstCardCategory: `${firstCardSelector}//span[@class="location-card-category"]`,
    });
  }
}

class PinnedTRRs extends Section {
  constructor() {
    super();

    const sectionSelector = '//div[contains(@class, "test--TRR-section")]';
    const firstCardSelector = `(${sectionSelector}/div[@class="type-cards"]/div)[1]`;

    this.prepareElementGetters({
      title: `${sectionSelector}/div[@class="type-title"]`,
      firstCardUnpinBtn: `${firstCardSelector}/span[starts-with(@class, "item-unpin-button")]`,
      firstCardDate: `${firstCardSelector}//span[@class="location-card-date"]`,
      firstCardCategory: `${firstCardSelector}//span[@class="location-card-category"]`,
    });
  }
}

class AnimatedSocialGraphSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      coaccusalsThresholdText: '(//p[contains(@class, "coaccusals-threshold-text")])',
      toggleTimelineButton: '(//button[contains(@class, "toggle-timeline-btn")])',
      startDate: '(//div[contains(@class, "start-date-label")])',
      endDate: '(//div[contains(@class, "end-date-label")])',
      currentDate: '(//span[contains(@class, "current-date-label")])',
      timelineSlider: '(//div[contains(@class, "test--timeline-slider")])',
      biggestGraphNode: '(//*[@r="7"])',
      playButton: '(//button[contains(@class, "play-icon")])',
    });
  }

  graphNodes() {
    return browser.elements('(//*[name()="circle" and contains(@class, "node")])').value;
  }

  graphLinks() {
    return browser.elements('(//*[name()="line" and contains(@class, "link")])').value;
  }

  graphLabels() {
    return browser.elements('(//*[name()="text" and @class="node-label"])').value;
  }
}


class BaseComplaintCardSection extends Section {
  constructor(baseSelector) {
    super();

    this.mainElementSelector = `${baseSelector}//div[contains(@class, "base-complaint-card")]`;

    this.prepareElementGetters({
      mainElement: this.mainElementSelector,
      leftHalf: `${this.mainElementSelector}//div[contains(@class, "left-half")]`,
      rightHalf: `${this.mainElementSelector}//a[contains(@class, "right-half")]`,
      thumbnail: `${this.mainElementSelector}//div[contains(@class, "document-card-thumbnail")]`,
      plusButton: `${this.mainElementSelector}//div[contains(@class, "plus-button")]`,
      incidentDate: `${this.mainElementSelector}//div[contains(@class, "incident-date")]`,
      category: `${this.mainElementSelector}//div[contains(@class, "category")]`,
      topOfficers: `${this.mainElementSelector}//div[contains(@class, "top-officers")]`,
      firstTopOfficerName: `${this.mainElementSelector}//div[@class="top-officer-row-officer-name"]`,
      secondTopOfficerName: `(${this.mainElementSelector}//div[@class="top-officer-row-officer-name"])[2]`,
      remainingOfficers: `${this.mainElementSelector}//div[contains(@class, "remaining-officers")]`,
      miniOfficerToken: `${this.mainElementSelector}//div[contains(@class, "mini-officer-visual-token")]`,
      notShowingOfficerCount: `${this.mainElementSelector}//div[contains(@class, "not-showing-officer-count")]`,
    });
  }
}

class CoaccusalCardSection extends Section {
  constructor(baseSelector) {
    super();

    this.mainElementSelector = `${baseSelector}//a[contains(@class, "relevant-coaccusal-card")]`;

    this.prepareElementGetters({
      mainElement: this.mainElementSelector,
      plusButton: `${this.mainElementSelector}//div[contains(@class, "plus-button")]`,
      radarChart: `${this.mainElementSelector}//div[contains(@class, "radar-chart-wrapper")]`,
      nameWrapper: `${this.mainElementSelector}//div[contains(@class, "officer-name-wrapper")]`,
      officerRank: `${this.mainElementSelector}//p[contains(@class, "officer-card-rank")]`,
      officerName: `${this.mainElementSelector}//p[contains(@class, "officer-card-name")]`,
      coaccusalCount: `${this.mainElementSelector}//div[contains(@class, "coaccusal-count")]`,
    });
  }
}

class BaseRelevantSection extends Section {
  constructor(baseSelector) {
    super();
    this.prepareElementGetters({
      title: `${baseSelector}//div[contains(@class, "relevant-infinite-carousel-title")]`,
      leftArrow: `${baseSelector}//button[contains(@class, "left relevant-carousel-arrow")]`,
      rightArrow: `${baseSelector}//button[contains(@class, "right relevant-carousel-arrow")]`,
    });
  }
}


class RelevantDocumentsSection extends BaseRelevantSection {
  constructor() {
    const baseSelector = '//div[contains(@class, "relevant-documents")]';
    super(baseSelector);
    this.documentCardSection = new BaseComplaintCardSection(baseSelector);
  }

  documentCards() {
    return browser.elements(this.documentCardSection.mainElementSelector).value;
  }
}

class RelevantComplaintsSection extends BaseRelevantSection {
  constructor() {
    const baseSelector = '//div[contains(@class, "relevant-complaints")]';
    super(baseSelector);
    this.complaintCardSection = new BaseComplaintCardSection(baseSelector);
  }

  complaintCards() {
    return browser.elements(this.complaintCardSection.mainElementSelector).value;
  }
}

class RelevantCoaccusalsSection extends BaseRelevantSection {
  constructor() {
    const baseSelector = '//div[contains(@class, "relevant-coaccusals")]';
    super(baseSelector);
    this.coaccusalCardSection = new CoaccusalCardSection(baseSelector);
  }

  coaccusalCards() {
    return browser.elements(this.coaccusalCardSection.mainElementSelector).value;
  }
}

class PinboardSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      title: '(//div[contains(@class, "pinboard-title")])',
      description: '(//div[contains(@class, "pinboard-description")])',
      pinboardPaneMenu: '(//div[contains(@class, "pinboard-pane-section-menu")])',
      networkPaneName: '//span[contains(@class, "pinboard-pane-tab-name")][1]',
      geographicPaneName: '//span[contains(@class, "pinboard-pane-tab-name")][2]',
    });
  }
}

class PinboardPinnedSection extends Section {
  officers = new PinnedOfficers()
  crs = new PinnedCRs()
  trrs = new PinnedTRRs()

  constructor() {
    super();
  }
}

class GeographicSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      complaintText: '//div[contains(@class, "legend__legend")]//div[1]//span[contains(@class, "legend-row-text")]',
      trrText: '//div[contains(@class, "legend__legend")]//div[2]//span[contains(@class, "legend-row-text")]',
      complaintNumber: '//div[contains(@class, "legend__legend")]//div[1]//span[contains(@class, "legend-row-number")]',
      trrNumber: '//div[contains(@class, "legend__legend")]//div[2]//span[contains(@class, "legend-row-number")]',
    });
  }
}

class PinboardPage extends Page {
  pinnedSection = new PinboardPinnedSection();
  animatedSocialGraphSection = new AnimatedSocialGraphSection();
  geographicSection = new GeographicSection();
  pinboardSection = new PinboardSection();
  relevantDocumentsSection = new RelevantDocumentsSection();
  relevantCoaccusalsSection = new RelevantCoaccusalsSection();
  relevantComplaintsSection = new RelevantComplaintsSection();

  constructor() {
    super();

    this.prepareElementGetters({
      searchBar: '//div[starts-with(@class, "search-bar")]'
    });
  }

  open() {
    super.open('/pinboard/5cd06f2b/pinboard-title/');
  }
}

module.exports = new PinboardPage();
