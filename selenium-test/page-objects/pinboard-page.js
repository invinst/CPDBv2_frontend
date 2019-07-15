import Page from './page';
import Section from './sections/section';


class PinnedOfficers extends Section {
  constructor() {
    super();

    const sectionSelector = '//div[contains(@class, "test--OFFICER-section")]';
    this.officerCardSelector = `${sectionSelector}/div[contains(@class, "type-cards")]/div`;
    const firstCardSelector = `(${this.officerCardSelector})[1]`;

    this.prepareElementGetters({
      title: `${sectionSelector}/div[@class="type-title"]`,
      firstCardUnpinBtn: `${firstCardSelector}//span[starts-with(@class, "item-unpin-button")]`,
      firstCardRank: `${firstCardSelector}//div[@class="officer-rank"]`,
      firstCardName: `${firstCardSelector}//div[@class="officer-name"]`,
      firstCardCRsCount: `${firstCardSelector}//div[@class="officer-complaints-count"]`,
      undoCard: '.test--undo-card',
    });
  }

  officerCards() {
    return browser.elements(this.officerCardSelector).value;
  }
}

class PinnedCRs extends Section {
  constructor() {
    super();

    const sectionSelector = '//div[contains(@class, "test--CR-section")]';
    this.crCardSelector = `${sectionSelector}/div[contains(@class, "type-cards")]/div`;
    const firstCardSelector = `(${this.crCardSelector})[1]`;

    this.prepareElementGetters({
      title: `${sectionSelector}/div[@class="type-title"]`,
      firstCardUnpinBtn: `${firstCardSelector}/span[starts-with(@class, "item-unpin-button")]`,
      firstCardDate: `${firstCardSelector}//span[@class="location-card-date"]`,
      firstCardCategory: `${firstCardSelector}//span[@class="location-card-category"]`,
    });
  }

  crCards() {
    return browser.elements(this.crCardSelector).value;
  }
}

class PinnedTRRs extends Section {
  constructor() {
    super();

    const sectionSelector = '//div[contains(@class, "test--TRR-section")]';
    this.trrCardSelector = `${sectionSelector}/div[contains(@class, "type-cards")]/div`;
    const firstCardSelector = `(${this.trrCardSelector})[1]`;

    this.prepareElementGetters({
      firstElement: firstCardSelector,
      title: `${sectionSelector}/div[@class="type-title"]`,
      firstCardUnpinBtn: `${firstCardSelector}/span[starts-with(@class, "item-unpin-button")]`,
      firstCardDate: `${firstCardSelector}//span[@class="location-card-date"]`,
      firstCardCategory: `${firstCardSelector}//span[@class="location-card-category"]`,
    });
  }

  trrCards() {
    return browser.elements(this.trrCardSelector).value;
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
    this.wrapperSelector = `${baseSelector}//div[contains(@class, "swiper-slide")]`;

    this.prepareElementGetters({
      mainElement: this.mainElementSelector,
      leftHalf: `${this.mainElementSelector}//div[contains(@class, "left-half")]`,
      rightHalf: `${this.mainElementSelector}//div[contains(@class, "right-half")]`,
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

    this.mainElementSelector = `${baseSelector}//div[contains(@class, "relevant-coaccusal-card")]`;
    this.wrapperSelector = `${baseSelector}//div[contains(@class, "swiper-slide")]`;

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
      title: '.pinboard-title',
      description: '.pinboard-description',
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

class EmptyPinboardSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      mainElement: '//div[contains(@class, "empty-pinboard__empty-pinboard")]',
      firstExample: '//a[contains(@class, "example-pinboard-link__example-pinboard-link")][1]',
      secondExample: '//a[contains(@class, "example-pinboard-link__example-pinboard-link")][2]',
    });
  }
}

class PreviewPane extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      mainElement: '//div[starts-with(@class, "preview-pane")]',
      actionText: '.new-call-to-action-widget-text',
      trrTitle: '.trr-preview-pane-title-title',
      trrFirstInfo: '//div[@class="trr-preview-pane-info-row"][1]',
      trrSecondInfo: '//div[@class="trr-preview-pane-info-row"][2]',
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
  emptyPinboardSection = new EmptyPinboardSection();
  previewPane = new PreviewPane();

  constructor() {
    super();

    this.prepareElementGetters({
      searchBar: '//div[@class="pinboard-header"]//div[starts-with(@class, "search-bar")]',
      header: '.pinboard-header .header-parent',
      headerTitle: '.pinboard-header .header-title',
      headerQALink: '//div[@class="pinboard-header"]//div[@class="menu-item" and text()="Q&A"]',
    });
  }

  open(id='5cd06f2b') {
    super.open(`/pinboard/${id}/pinboard-title/`);
  }
}

module.exports = new PinboardPage();
