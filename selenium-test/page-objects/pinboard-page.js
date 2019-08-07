import Page from './page';
import Section from './sections/section';


class PinnedOfficers extends Section {
  constructor() {
    super();

    const sectionSelector = '//div[contains(@class, "test--OFFICER-section")]';
    this.officerCardSelector = `${sectionSelector}/div[contains(@class, "type-cards")]/div`;
    const firstCardSelector = `(${this.officerCardSelector})[1]`;
    const secondCardSelector = `(${this.officerCardSelector})[2]`;

    this.prepareElementGetters({
      title: `${sectionSelector}/div[@class="type-title"]`,
      firstCardUnpinBtn: `${firstCardSelector}//span[starts-with(@class, "item-unpin-button")]`,
      firstCardRank: `${firstCardSelector}//div[@class="officer-rank"]`,
      firstCardName: `${firstCardSelector}//div[@class="officer-name"]`,
      firstCardCRsCount: `${firstCardSelector}//div[@class="officer-complaints-count"]`,
      secondCardName: `${secondCardSelector}//div[@class="officer-name"]`,
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
      firstCardUnpinBtn: `${firstCardSelector}/div[starts-with(@class, "item-unpin-button")]`,
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
      firstCardUnpinBtn: `${firstCardSelector}/div[starts-with(@class, "item-unpin-button")]`,
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
  constructor(parentSelector) {
    super(parentSelector, '//div[contains(@class, "base-complaint-card")]');

    this.prepareElementGetters({
      leftHalf: '//div[contains(@class, "left-half")]',
      rightHalf: '//div[contains(@class, "right-half")]',
      thumbnail: '//div[contains(@class, "document-card-thumbnail")]',
      plusButton: '//div[contains(@class, "plus-button")]',
      incidentDate: '//div[contains(@class, "incident-date")]',
      category: '//div[contains(@class, "category")]',
      topOfficers: '//div[contains(@class, "top-officers")]',
      firstTopOfficerName: '//div[@class="top-officer-row-officer-name"]',
      secondTopOfficerName: '(//div[@class="top-officer-row-officer-name"])[2]',
      remainingOfficers: '//div[contains(@class, "remaining-officers")]',
      miniOfficerToken: '//div[contains(@class, "mini-officer-visual-token")]',
      notShowingOfficerCount: '//div[contains(@class, "not-showing-officer-count")]',
    });
  }
}

class UndoCardSection extends Section {
  constructor(parentSelector='') {
    super(parentSelector, '//div[contains(@class, "test--undo-card")]');
    this.prepareElementGetters();
  }
}

class CoaccusalCardSection extends Section {
  constructor(parentSelector) {
    super(parentSelector, '//div[contains(@class, "relevant-coaccusal-card")]');

    this.prepareElementGetters({
      plusButton: '//div[contains(@class, "plus-button")]',
      radarChart: '//div[contains(@class, "radar-chart-wrapper")]',
      nameWrapper: '//div[contains(@class, "officer-name-wrapper")]',
      officerRank: '//p[contains(@class, "officer-card-rank")]',
      officerName: '//p[contains(@class, "officer-card-name")]',
      coaccusalCount: '//div[contains(@class, "coaccusal-count")]',
    });
  }
}

class BaseRelevantSection extends Section {
  constructor(parentSelector, mainElementSelector) {
    super(parentSelector, mainElementSelector);
    this.prepareElementGetters({
      title: '//div[contains(@class, "relevant-infinite-carousel-title")]',
      leftArrow: '//button[contains(@class, "left relevant-carousel-arrow")]',
      rightArrow: '//button[contains(@class, "right relevant-carousel-arrow")]',
      undoCard: UndoCardSection,
    });
  }
}


class RelevantDocumentsSection extends BaseRelevantSection {
  constructor() {
    super('', '//div[contains(@class, "relevant-documents")]');
    this.prepareElementGetters({
      documentCardSection: BaseComplaintCardSection,
    });
  }

  documentCards() {
    return browser.elements(this.documentCardSection.mainElementSelector).value;
  }
}

class RelevantComplaintsSection extends BaseRelevantSection {
  constructor() {
    super('', '//div[contains(@class, "relevant-complaints")]');
    this.prepareElementGetters({
      complaintCardSection: BaseComplaintCardSection,
    });
  }

  complaintCards() {
    return browser.elements(this.complaintCardSection.mainElementSelector).value;
  }
}

class RelevantCoaccusalsSection extends BaseRelevantSection {
  constructor() {
    super('', '//div[contains(@class, "relevant-coaccusals")]');
    this.prepareElementGetters({
      coaccusalCardSection: CoaccusalCardSection,
    });
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
    super('', '//div[contains(@class, "empty-pinboard__empty-pinboard")]');

    this.prepareElementGetters({
      firstExample: '//a[contains(@class, "example-pinboard-link__example-pinboard-link")][1]',
      secondExample: '//a[contains(@class, "example-pinboard-link__example-pinboard-link")][2]',
    });
  }
}

class PreviewPane extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      wrapper: '//div[starts-with(@class, "preview-pane")]',
      actionText: '.new-call-to-action-widget-text',
      trrTitle: '.trr-preview-pane-title-title',
      trrFirstInfo: '//div[@class="trr-preview-pane-info-row"][1]',
      trrSecondInfo: '//div[@class="trr-preview-pane-info-row"][2]',
    });
  }
}

class OfficerPreviewPane extends Section {
  constructor() {
    super();
    this.officerInfoWidgetSelector = '//li[starts-with(@class, "new-officer-info-widget")]';
    this.officerMetricWidgetItemSelector = '//div[starts-with(@class, "new-metric-widget-item")]',

    this.prepareElementGetters({
      wrapper: '//div[starts-with(@class, "preview-pane")]',
      gradient: '.test--gradient',
      communityPane: '.test--preview-pane-community',
      neighborhoodPane: '.test--preview-pane-neighborhood',
      listMostOfficers: '//*[starts-with(@class, "preview-pane")]//*[contains(@class,"list-widget-item-link")]',
      pinButton: '.pin-button',
      viewOfficerButton: '.view-officer-profile-button',
      officerName: '.test--officer-name',
      genericInfo: `(${this.officerInfoWidgetSelector})[1]`,
      badgeKey: `(${this.officerInfoWidgetSelector})[2]//div[contains(@class, "item-key")]`,
      badgeValue: `(${this.officerInfoWidgetSelector})[2]//div[contains(@class, "item-value")]`,
      rankKey: `(${this.officerInfoWidgetSelector})[3]//div[contains(@class, "item-key")]`,
      rankValue: `(${this.officerInfoWidgetSelector})[3]//div[contains(@class, "item-value")]`,
      unitKey: `(${this.officerInfoWidgetSelector})[4]//div[contains(@class, "item-key")]`,
      unitValue: `(${this.officerInfoWidgetSelector})[4]//div[contains(@class, "item-value")]`,
      careerKey: `(${this.officerInfoWidgetSelector})[5]//div[contains(@class, "item-key")]`,
      careerValue: `(${this.officerInfoWidgetSelector})[5]//div[contains(@class, "item-value")]`,
      allegationValue: `(${this.officerMetricWidgetItemSelector})[1]//div[contains(@class, "item-value")]`,
      allegationName: `(${this.officerMetricWidgetItemSelector})[1]//div[contains(@class, "item-name")]`,
      allegationDescription: `(${this.officerMetricWidgetItemSelector})[1]//div[contains(@class, "item-description")]`,
      sustainedValue: `(${this.officerMetricWidgetItemSelector})[2]//div[contains(@class, "item-value")]`,
      sustainedName: `(${this.officerMetricWidgetItemSelector})[2]//div[contains(@class, "item-name")]`,
      sustainedDescription: `(${this.officerMetricWidgetItemSelector})[2]//div[contains(@class, "item-description")]`,
      trrValue: `(${this.officerMetricWidgetItemSelector})[3]//div[contains(@class, "item-value")]`,
      trrName: `(${this.officerMetricWidgetItemSelector})[3]//div[contains(@class, "item-name")]`,
      trrDescription: `(${this.officerMetricWidgetItemSelector})[3]//div[contains(@class, "item-description")]`,
      allegationCivilianValue: `(${this.officerMetricWidgetItemSelector})[4]//div[contains(@class, "item-value")]`,
      allegationCivilianName: `(${this.officerMetricWidgetItemSelector})[4]//div[contains(@class, "item-name")]`,
      majorAwardValue: `(${this.officerMetricWidgetItemSelector})[5]//div[contains(@class, "item-value")]`,
      majorAwardName: `(${this.officerMetricWidgetItemSelector})[5]//div[contains(@class, "item-name")]`,
      honorableMentionValue: `(${this.officerMetricWidgetItemSelector})[6]//div[contains(@class, "item-value")]`,
      honorableMentionName: `(${this.officerMetricWidgetItemSelector})[6]//div[contains(@class, "item-name")]`,
      honorableMentionDescription:
        `(${this.officerMetricWidgetItemSelector})[6]//div[contains(@class, "item-description")]`,
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
  officerPreviewPane = new OfficerPreviewPane();

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
