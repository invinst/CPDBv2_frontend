import { each } from 'lodash';

import Page from './page';
import Section from './sections/section';
import PinboardsMenuSection from './sections/pinboards-menu';


const paneSelector = (rowId, colId) => (
  `//div[contains(@class, "metrics-column")][${colId}]//div[contains(@class, "metric-pane__metric-pane")][${rowId}]`
);

const metricPaneValueSelector = (rowId, colId) => (
  paneSelector(rowId, colId) + '//div[contains(@class, "metrics-pane-value")]'
);

const metricPaneDescriptionSelector = (rowId, colId) => (
  paneSelector(rowId, colId) + '//div[contains(@class, "metrics-pane-description")]'
);

class SummarySection extends Section {
  constructor() {
    super();

    const fields = ['yearOfBirth', 'race', 'sex', 'badge', 'rank', 'unit', 'career'];

    const elementGetters = {
      officerName: '.summary-section-officer-name',
      viewUnitProfileButton: '//a[contains(@class, "view-unit-profile-button")]',
    };
    each(fields, (field, index) => {
      elementGetters[`${field}Label`] = `(//span[@class="summary-field-label"])[${index + 1}]`;
      elementGetters[`${field}Value`] = `(//span[@class="summary-field-value"])[${index + 1}]`;
      elementGetters[`${field}ExtraInfo`] = `(//span[@class="summary-field-extra-info"])[${index + 1}]`;
    });

    this.prepareElementGetters(elementGetters);
  }
}

class MetricsSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      allegationCount: metricPaneValueSelector(1, 1),
      allegationDescription: metricPaneDescriptionSelector(1, 1),
      disciplineCount: metricPaneValueSelector(2, 1),
      disciplineDescription: metricPaneDescriptionSelector(2, 1),
      useOfForceCount: metricPaneValueSelector(1, 2),
      useOfForceDescription: metricPaneDescriptionSelector(1, 2),
      totalLawsuitSettlements: metricPaneValueSelector(2, 2),
      majorAwardCount: metricPaneValueSelector(1, 3),
      honorableMentionCount: metricPaneValueSelector(2, 3),
      honorableDescriptionCount: metricPaneDescriptionSelector(2, 3),
    });
  }
}

class Filter extends Section {
  constructor() {
    super('', '//div[contains(@class, "timeline-filter")]');

    this.prepareElementGetters({
      button: '//div[@class="dropdown-button"]',
      menu: '//div[contains(@class, "dropdown-menu")]',
      crs: '(//div[@class="dropdown-menu-item"])[1]',
      sustained: '(//div[@class="dropdown-menu-item"])[2]',
      force: '(//div[@class="dropdown-menu-item"])[3]',
      awards: '(//div[@class="dropdown-menu-item"])[4]',
      lawsuits: '(//div[@class="dropdown-menu-item"])[5]',
      changes: '(//div[@class="dropdown-menu-item"])[6]',
    });
  }
}

class TimelineSection extends Section {
  filter = new Filter();

  constructor() {
    super();
    this.prepareElementGetters({
      header: '.timeline-header',
      crItem: '//div[contains(@class, "timeline-cr-item")]',
      trrItem: '//div[contains(@class, "timeline-force-item")]',
      awardItem: '//div[contains(@class, "timeline-award-item")]',
      lawsuitItem: '//div[contains(@class, "timeline-lawsuit-item")]',
      unitChangeItem: '//div[contains(@class, "timeline-unit-change-item")]',
      rankChangeItem: '//div[contains(@class, "timeline-rank-change-item")]',
      joinedItem: '//div[contains(@class, "timeline-joined-item")]',
      yearItem: '//div[contains(@class, "timeline-year-item")]',
      emptyItem: '//div[contains(@class, "timeline-empty-item")]',
      lawsuitAttachmentThumbnail: '.lawsuit-item-content .attachment-image',
      complaintAttachmentThumbnail: '.cr-item-content .attachment-image',
      moreComplaintAttachment: '.cr-item-content .more-attachment',
      rankPopup: '.rank-header .popup',
      rankPopupButton: '.rank-header .popup-button',
      salaryPopup: '//div[contains(@class, "salary__salary")]//div[contains(@class, "popup")]',
      salaryPopupButton: '//div[contains(@class, "salary__salary")]//div[@class="popup-button"]',
    });
  }
}

class CoaccusalsSection extends Section {
  constructor() {
    super();
    const firstCoaccusalCardSelector = '//a[contains(@class, "officer-card")]';
    this.prepareElementGetters({
      firstCoaccusalGroupName: '//span[contains(@class, "coaccusals-group-name")][1]',
      firstCoaccusalCard: firstCoaccusalCardSelector,
      firstPinButton: `${firstCoaccusalCardSelector}//div[contains(@class, "item-pin-button__item-pin-button")]`,
      firstRadarChart: `${firstCoaccusalCardSelector}//*[name()="svg" and contains(@class, "radar")]`,
    });
  }
}

class AttachmentsSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      attachmentComplaint: '//div[contains(@class, "complaint__complaint")]',
      attachmentComplaintHeading: '//div[contains(@class, "complaint__complaint")]'
        + '//a[contains(@class, "heading__heading")]',
      complaintAttachment: '//div[contains(@class, "complaint__complaint")]'
        + '//div[contains(@class, "attachment__attachment")]',
      attachmentLawsuit: '//div[contains(@class, "lawsuit__lawsuit")]',
      attachmentLawsuitHeading: '//div[contains(@class, "lawsuit__lawsuit")]//a[contains(@class, "heading__heading")]',
      lawsuitAttachment: '//div[contains(@class, "lawsuit__lawsuit")]//div[contains(@class, "attachment__attachment")]',
    });
  }
}

class MapSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      map: '//div[contains(@class, "map")]',
    });
  }
}

class TabbedPaneSection extends Section {
  timelineSection = new TimelineSection();
  coaccusalsSection = new CoaccusalsSection();
  attachmentsSection = new AttachmentsSection();
  mapSection = new MapSection();

  constructor() {
    super();

    this.prepareElementGetters({
      menu: '.tabbed-pane-section-menu',
      timelineTabName: '//span[contains(@class, "tabbed-pane-tab-name")][1]',
      mapTabName: '//span[contains(@class, "tabbed-pane-tab-name")][2]',
      coaccusalsTabName: '//span[contains(@class, "tabbed-pane-tab-name")][3]',
      attachmentsTabName: '//span[contains(@class, "tabbed-pane-tab-name")][4]',
    });
  }
}

class RadarChartExplainerSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      component: '.radar-explainer-window',
      triangleExplainer: '//div[contains(@class, "triangle-explainer")]',
      triangleExplainerText: '//div[contains(@class, "triangle-explainer-text")]',
      triangleExplainerSubText: '//div[contains(@class, "triangle-explainer-subtext")]',
      triangleEditButton: '//div[contains(@class, "triangle-explainer")]' +
        '//a[contains(@class, "hoverable-edit-wrapper-button")]',
      scaleExplainer: '//div[contains(@class, "scale-explainer")]',
      scaleExplainerText: '//div[contains(@class, "scale-explainer-text")]',
      scaleExplainerSubText: '//div[contains(@class, "scale-explainer-subtext")]',
      scaleEditButton: '//div[contains(@class, "scale-explainer")]' +
        '//a[contains(@class, "hoverable-edit-wrapper-button")]',
      percentileByYear: '//div[contains(@class, "percentiles-by-year")]',
      leftNavigation: '//span[contains(@class, "left-navigation")]',
      rightNavigation: '//span[contains(@class, "right-navigation")]',
      closeExplainerButton: '.radar-explainer-close-button',
    });
  }
}

class NoDataRadarChartSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      component: '//div[contains(@class, "radar-chart")]',
      noDataText: '.test--no-data-text',
      radarChart: '.test--radar',
      editButton: '//div[contains(@class, "radar-chart")]//a[contains(@class, "hoverable-edit-wrapper-button")]',
    });
  }
}

class RadarChartSection extends Section {
  explainerSection = new RadarChartExplainerSection();
  noDataRadarChartSection = new NoDataRadarChartSection();

  constructor() {
    super();
    this.prepareElementGetters({
      component: '//div[contains(@class, "radar-chart")]',
      svg: '.test--radar',
      axis: '.test--radar-axis-wrapper',
      wrapper: '.test--radar-wrapper',
      legend: '.test--radar-legend-content',
      lastAxisTitle: '.test--radar-axis-text:last-of-type',
      radarChartPlaceHolder: '.officer-radar-chart-placeholder',
    });
  }
}

class OfficerPage extends Page {
  summarySection = new SummarySection();
  metricsSection = new MetricsSection();
  tabbedPaneSection = new TabbedPaneSection();
  radarChartSection = new RadarChartSection();
  pinboardsMenuSection = new PinboardsMenuSection();

  constructor() {
    super();

    this.prepareElementGetters({
      element: '.test--bottom-sheet-wrapper',
      pinButton: '.shareable-header-nav-bar div.pin-button',
      lastToast: '(//div[contains(@class, "Toastify__toast-body")])[last()]',
      landingPageBreadCrumb: '//a[contains(@class, "breadcrumb-item") and .="cpdp"]',
    });
  }

  open(id=1, name, tab) {
    const url = ['/officer', id, name, tab].filter(Boolean).join('/') + '/';
    super.open(url);
  }
}

module.exports = new OfficerPage();
