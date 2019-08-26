import { each } from 'lodash';

import Page from './page';
import Section from './sections/section';


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

class Filter extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      button: '.test--timeline-filter .test--dropdown-button',
      menu: '.test--timeline-filter .test--dropdown-menu',
      crs: '(//div[@class="test--dropdown-menu-item"])[1]',
      sustained: '(//div[@class="test--dropdown-menu-item"])[2]',
      force: '(//div[@class="test--dropdown-menu-item"])[3]',
      awards: '(//div[@class="test--dropdown-menu-item"])[4]',
      changes: '(//div[@class="test--dropdown-menu-item"])[5]',
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
      unitChangeItem: '//div[contains(@class, "timeline-unit-change-item")]',
      rankChangeItem: '//div[contains(@class, "timeline-rank-change-item")]',
      joinedItem: '//div[contains(@class, "timeline-joined-item")]',
      yearItem: '//div[contains(@class, "timeline-year-item")]',
      emptyItem: '//div[contains(@class, "timeline-empty-item")]',
      attachmentThumbnail: '.attachment-image',
      moreAttachment: '.more-attachment',
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

    this.prepareElementGetters({
      firstCoaccusalGroupName: '//span[contains(@class, "coaccusals-group-name")][1]',
      firstCoaccusalCard: '//a[contains(@class, "officer-card")]',
    });
  }
}

class AttachmentsSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      attachmentComplaint: '//div[contains(@class, "complaint__complaint")]',
      attachmentHeading: '//div[contains(@class, "complaint__complaint")]//a[contains(@class, "heading__heading")]',
      attachment: '//a[contains(@class, "attachment__attachment")]',
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
  tabbedPaneSection = new TabbedPaneSection();
  radarChartSection = new RadarChartSection();

  constructor() {
    super();

    this.prepareElementGetters({
      element: '.test--bottom-sheet-wrapper',
    });
  }

  open(id=1, name, tab) {
    const url = ['/officer', id, name, tab].filter(Boolean).join('/') + '/';
    super.open(url);
  }
}

module.exports = new OfficerPage();
