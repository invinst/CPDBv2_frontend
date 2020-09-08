import Page from './page';
import Section from './sections/section';
import { PreviewPaneSection, SummaryWidget, summarySectionSelectorByTitle } from './pinboard-page-common';

const demographicBarSelector = (index) => `//*[@class="bar-chart"]//*[${index}]`;
const demographicPercentageSelector = (index) => `//*[contains(@class, "bar-chart-precentage")][${index}]`;
const demographicLabelSelector = (index) => `//*[contains(@class, "bar-chart-label")]/*[${index}]`;

class DemographicChartSection extends Section {
  constructor(parentSelector, chartIndex) {
    super(`(${parentSelector}//*[contains(@class, "demographic-chart__demographic-chart")])[${chartIndex}]`);

    this.prepareElementGetters({
      firstBar: demographicBarSelector(1),
      firstPercentage: demographicPercentageSelector(1),
      firstLabel: demographicLabelSelector(1),
      secondBar: demographicBarSelector(2),
      secondPercentage: demographicPercentageSelector(2),
      secondLabel: demographicLabelSelector(2),
      thirdBar: demographicBarSelector(3),
      thirdPercentage: demographicPercentageSelector(3),
      thirdLabel: demographicLabelSelector(3),
      fourthBar: demographicBarSelector(4),
      fourthPercentage: demographicPercentageSelector(4),
      fourthLabel: demographicLabelSelector(4),
    });
  }

  charts() {
    return $$(`${this.parentSelector}//*[@class="bar-chart"]/*`);
  }
}

class DemographicWidget extends Section {
  constructor(parentSelector) {
    super(parentSelector);
    this.raceSection = new DemographicChartSection(parentSelector, 1);
    this.genderSection = new DemographicChartSection(parentSelector, 2);
    this.prepareElementGetters({
      widgetTitle: '//div[contains(@class, "widget-title")]',
      spinner: '//*[contains(@class, "widget__widget-spinner")]',
    });
  }
}

class PinnedOfficers extends Section {
  constructor() {
    super();

    const sectionSelector = '//div[contains(@class, "test--OFFICER-section")]';
    this.officerCardSelector = `${sectionSelector}/div[contains(@class, "pinned-grid")]/div`;
    const firstCardSelector = `(${this.officerCardSelector})[1]`;
    const secondCardSelector = `(${this.officerCardSelector})[2]`;

    this.prepareElementGetters({
      title: `${sectionSelector}/div[@class="type-title"]`,
      cards: `${sectionSelector}/div[contains(@class, "pinned-grid")]/div`,
      firstCardUnpinBtn: `${firstCardSelector}//span[starts-with(@class, "item-unpin-button")]`,
      firstCardRank: `${firstCardSelector}//div[@class="officer-rank"]`,
      firstCardName: `${firstCardSelector}//div[@class="officer-name"]`,
      firstCardCRsCount: `${firstCardSelector}//div[@class="officer-complaints-count"]`,
      firstCardRadarChart: `${firstCardSelector}//*[name()="svg" and contains(@class, "radar")]`,
      secondCardName: `${secondCardSelector}//div[@class="officer-name"]`,
      undoCard: '.test--undo-card',
    });
  }

  officerCards() {
    return $$(this.officerCardSelector);
  }
}

class PinnedCRs extends Section {
  constructor() {
    super();

    const sectionSelector = '//div[contains(@class, "test--CR-section")]';
    this.crCardSelector = `${sectionSelector}/div[contains(@class, "pinned-grid")]/div`;
    const firstCardSelector = `(${this.crCardSelector})[1]`;

    this.prepareElementGetters({
      title: `${sectionSelector}/div[@class="type-title"]`,
      cards: `${sectionSelector}/div[contains(@class, "pinned-grid")]/div`,
      firstCardUnpinBtn: `${firstCardSelector}//span[starts-with(@class, "item-unpin-button")]`,
      firstCardDate: `${firstCardSelector}//span[@class="location-card-date"]`,
      firstCardCategory: `${firstCardSelector}//span[@class="location-card-category"]`,
    });
  }

  crCards() {
    return $$(this.crCardSelector);
  }
}

class PinnedTRRs extends Section {
  constructor() {
    super();

    const sectionSelector = '//div[contains(@class, "test--TRR-section")]';
    this.trrCardSelector = `${sectionSelector}/div[contains(@class, "pinned-grid")]/div`;
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
    return $$(this.trrCardSelector);
  }
}

class AnimatedSocialGraphSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      biggestGraphNode: '(//*[@r="7"])',
    });
  }

  graphNodes() {
    return $$('(//*[name()="circle" and contains(@class, "node")])');
  }

  graphLinks() {
    return $$('(//*[name()="line" and contains(@class, "link")])');
  }

  graphLabels() {
    return $$('(//*[name()="text" and @class="node-label"])');
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
      thirdIncidentDate: '(//div[contains(@class, "incident-date")])[3]',
      category: '//div[contains(@class, "category")]',
      topOfficers: '//div[contains(@class, "top-officers")]',
      firstTopOfficerName: '//div[@class="top-officer-row-officer-name"]',
      firstTopRadarChart: '//div[contains(@class, "top-officers")]//*[name()="svg" and contains(@class, radar)]',
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
      radarChart: '//div[contains(@class, "radar-chart-wrapper")]//*[name()="svg" and contains(@class, "radar")]',
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
    return $$(this.documentCardSection.mainElementSelector);
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
    return $$(this.complaintCardSection.mainElementSelector);
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
    return $$(this.coaccusalCardSection.mainElementSelector);
  }
}

class PinboardSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      title: '.pinboard-title',
      description: '.pinboard-description',
      socialGraphExpandButton: '(//a[@class="expanded-mode-btn"])[1]',
      geographicExpandButton: '(//a[@class="expanded-mode-btn"])[2]',
    });
  }
}

class ManagePinboardsButtonsSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      pinboardsListButton: '.pinboards-list-btn',
      newPinboardMenuButton: '.new-pinboard-menu-btn',
      createNewPinboardButton: '.new-pinboard-link',
      duplicateCurrentPinboardButton: '.duplicate-current-pinboard-link',
    });
  }
}

class PinboardListItemSection extends Section {
  constructor(index) {
    super(
      '',
      `(//div[contains(@class, "pinboards__pinboards")]/div[contains(@class, "pinboard-item")])[${index}]`
    );

    this.prepareElementGetters({
      title: '//div[@class="pinboard-title"]',
      viewedAt: '//div[@class="pinboard-viewed-at"]',
      actionsButton: '//div[contains(@class, "pinboard-item-actions-btn")]',
      actionsPane: '//div[contains(@class, "pinboard-item-actions-menu")]',
      duplicateButton: '//div[@class="duplicate-pinboard-btn"]',
      removeButton: '//div[@class="remove-pinboard-btn"]',
      spinner: '//img[@class="spinner"]',
    });
  }
}

class PinboardsListSection extends Section {
  firstPinboardItem = new PinboardListItemSection(1);
  secondPinboardItem = new PinboardListItemSection(2);
  lastPinboardItem = new PinboardListItemSection('last()');

  constructor() {
    super();

    this.prepareElementGetters({
      pinboardsTitle: '.pinboards-title',
      createNewPinboardButton: '.new-pinboard-btn',
      overlay: '//div[@class="overlay" and @aria-hidden="false"]',
      pinboardActionsPane: '//div[@class="pinboard-item-actions-menu"]',
      duplicatePinboardButton: '(//a[contains(@class, "duplicate-pinboard-btn")])[1]',
      removePinboardButton: '(//a[contains(@class, "remove-pinboard-btn")])[1]',
    });
  }

  pinboardItems() {
    return $$('.pinboard-item');
  }
}

class PinboardPinnedSection extends Section {
  officers = new PinnedOfficers();
  crs = new PinnedCRs();
  trrs = new PinnedTRRs();

  constructor() {
    super();
  }
}

class EmptyPinboardSection extends Section {
  constructor() {
    super('', '//div[contains(@class, "empty-pinboard__empty-pinboard")]');

    this.prepareElementGetters({
      firstExample: '//a[contains(@class, "example-pinboard-link")][1]',
      firstExampleTitle:
        '//a[contains(@class, "example-pinboard-link")][1]//div[contains(@class, "title")]',
      firstExampleDescription:
        '//a[contains(@class, "example-pinboard-link")][1]//div[contains(@class, "description")]',
      secondExample: '//a[contains(@class, "example-pinboard-link")][2]',
      secondExampleTitle:
        '//a[contains(@class, "example-pinboard-link")][2]//div[contains(@class, "title")]',
      secondExampleDescription:
        '//a[contains(@class, "example-pinboard-link")][2]//div[contains(@class, "description")]',
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
      trrOfficerRadarChart: '//*[contains(@class, "list-widget-item")] //*[name()="svg" and contains(@class, "radar")]',
    });
  }
}

class OfficerPreviewPane extends Section {
  constructor() {
    super();
    this.officerInfoWidgetSelector = '//li[starts-with(@class, "officer-info-widget")]';
    this.officerMetricWidgetItemSelector = '//div[starts-with(@class, "new-metric-widget-item")]';

    this.prepareElementGetters({
      wrapper: '//div[starts-with(@class, "preview-pane")]',
      gradient: '.test--gradient',
      communityPane: '.test--preview-pane-community',
      neighborhoodPane: '.test--preview-pane-neighborhood',
      listMostOfficers: '//*[starts-with(@class, "preview-pane")]//*[contains(@class,"list-widget-item")]',
      pinButton: '.pin-button',
      viewOfficerButton: '.view-officer-profile-button',
      officerName: '.test--officer-name',
      radarChart: '//div[contains(@class, "new-visual-token-widget")]//*[name()="svg" and contains(@class, "radar")]',
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
  pinboardSection = new PinboardSection();
  managePinboardsButtonsSection = new ManagePinboardsButtonsSection();
  pinboardsListSection = new PinboardsListSection();
  relevantDocumentsSection = new RelevantDocumentsSection();
  relevantCoaccusalsSection = new RelevantCoaccusalsSection();
  relevantComplaintsSection = new RelevantComplaintsSection();
  emptyPinboardSection = new EmptyPinboardSection();
  previewPane = new PreviewPane();
  complaintPreviewPane = new PreviewPaneSection();
  officerPreviewPane = new OfficerPreviewPane();
  complaintSummaryWidget = new SummaryWidget(summarySectionSelectorByTitle('COMPLAINT SUMMARY'));
  trrSummaryWidget = new SummaryWidget(summarySectionSelectorByTitle('TACTICAL RESPONSE REPORT SUMMARY'));
  officersSummaryWidget = new DemographicWidget(summarySectionSelectorByTitle('OFFICERS'));
  complainantsSummaryWidget = new DemographicWidget(summarySectionSelectorByTitle('COMPLAINANTS'));

  constructor() {
    super();

    this.prepareElementGetters({
      searchBar: '//div[@class="pinboard-header"]//div[starts-with(@class, "search-bar")]',
      header: '.pinboard-header .header-parent',
      headerTitle: '.pinboard-header .header-title',
      headerQALink: '//div[@class="pinboard-header"]//div[@class="menu-item" and text()="Q&A"]',
      firstToast: '.Toastify__toast:first-child',
      secondToast: '.Toastify__toast:nth-child(2)',
      geographicMap: '//div[starts-with(@class, "allegations-map")]',
      widgetsLeftArrow: '//div[contains(@class, "pinboard-data-visualization")]' +
        '//button[contains(@class, "left carousel-arrow")]',
      widgetsRightArrow: '//div[contains(@class, "pinboard-data-visualization")]' +
        '//button[contains(@class, "right carousel-arrow")]',
    });
  }

  open(id='abcd5678') {
    const url = id ? `/pinboard/${id}/pinboard-title/` : '/pinboard/';

    super.open(url);
  }

  openByQuery(queryString) {
    super.open(`/pinboard/${queryString}`);
  }
}

module.exports = new PinboardPage();
