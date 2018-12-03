import { each } from 'lodash';

import Page from './page';
import Section from './sections/section';


class SummarySection extends Section {
  constructor() {
    super();

    const fields = ['yearOfBirth', 'race', 'sex', 'badge', 'rank', 'unit', 'career'];

    const elementGetters = {
      officerName: '.summary-section-officer-name',
      viewUnitProfileButton: '.test--view-profile-button',
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
    });
  }
}

class CoaccusalsSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      firstCoaccusalGroupName: '//span[contains(@class, "coaccusals-group-name")][1]',
      firstCoaccusalCard: '.test--officer-card',
    });
  }
}

class AttachmentsSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      attachmentComplaint: '.test--attachments-complaint',
      attachmentHeading: '.test--attachments-heading',
      attachment: '.test--attachment',
    });
  }
}

class MapSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      map: '.test--officer-map',
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
      triangleExplainer: '//div[contains(@class, "test--triangle-explainer")]',
      triangleExplainerText: '.test--triangle-explain-text',
      triangleExplainerSubText: '.test--triangle-explain-sub-text',
      triangleEditButton: '.test--triangle-explainer .test--edit-wrapper-edit-button',
      scaleExplainer: '.test--scale-explainer',
      scaleExplainerText: '.test--scale-explain-text',
      scaleExplainerSubText: '.test--scale-explain-sub-text',
      scaleEditButton: '.test--scale-explainer .test--edit-wrapper-edit-button',
      percentileByYear: '.test--percentile-by-year',
      leftNavigation: '.test--radar-explainer-navigation-left',
      rightNavigation: '.test--radar-explainer-navigation-right',
      closeExplainerButton: '.radar-explainer-close-button',
    });
  }
}

class NoDataRadarChartSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      component: '.test--officer--radar-chart',
      noDataText: '.test--no-data-text',
      radarChart: '.test--radar',
      editButton: '.test--officer--radar-chart .test--edit-wrapper-edit-button'
    });
  }
}

class RadarChartSection extends Section {
  explainerSection = new RadarChartExplainerSection();
  noDataRadarChartSection = new NoDataRadarChartSection();

  constructor() {
    super();
    this.prepareElementGetters({
      component: '.test--officer--radar-chart',
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
      element: '.test--bottom-sheet-wrapper'
    });
  }

  open(id=1, name, tab) {
    const url = ['/officer', id, name, tab].filter(Boolean).join('/') + '/';
    super.open(url);
    browser.element('body').waitForVisible();
  }
}

module.exports = new OfficerPage();
