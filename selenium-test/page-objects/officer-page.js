import { each } from 'lodash';

import Page from './page';
import Section from './sections/section';


class SummarySection extends Section {
  constructor() {
    super();

    const fields = ['yearOfBirth', 'race', 'sex', 'badge', 'rank', 'unit', 'career'];

    const elementGetters = {
      officerName: '.cr-summary-section-officer-name',
      viewUnitProfileButton: '.test--view-profile-button',
    };
    each(fields, (field, index) => {
      elementGetters[`${field}Label`] = `(//span[@class="test--field-label"])[${index + 1}]`;
      elementGetters[`${field}Value`] = `(//span[@class="test--field-value"])[${index + 1}]`;
      elementGetters[`${field}ExtraInfo`] = `(//span[@class="test--field-extra-info"])[${index + 1}]`;
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
      awards: '(//div[@class="test--dropdown-menu-item"])[4]'
    });
  }
}

class TimelineSection extends Section {
  filter = new Filter();

  constructor() {
    super();

    this.prepareElementGetters({
      header: '.test--timeline-header',
      crItem: '.test--timeline-cr-item',
      trrItem: '.test--timeline-trr-item',
      awardItem: '.test--timeline-award-item',
      unitChangeItem: '.test--timeline-unit-change-item',
      joinedItem: '.test--timeline-joined-item',
      yearItem: '.test--timeline-year-item',
      emptyItem: '.test--timeline-empty-item',
      attachmentThumbnail: '.test--attachment-image',
      moreAttachment: '.test--more-attachment',
    });
  }
}

class CoaccusalsSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      firstCoaccusalGroupName: '//span[@class="test--coaccusals-group-name"][1]',
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

class TabbedPaneSection extends Section {
  timelineSection = new TimelineSection();
  coaccusalsSection = new CoaccusalsSection();
  attachmentsSection = new AttachmentsSection();

  constructor() {
    super();

    this.prepareElementGetters({
      menu: '.test--tabbed-pane-section-menu',
      timelineTabName: '//span[@class="test--tabbed-pane-tab-name"][1]',
      mapTabName: '//span[@class="test--tabbed-pane-tab-name"][2]',
      coaccusalsTabName: '//span[@class="test--tabbed-pane-tab-name"][3]',
      attachmentsTabName: '//span[@class="test--tabbed-pane-tab-name"][4]',
    });
  }
}

class RadarChartExplainerSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      component: '.test--radar-explainer-window',
      triangleExplainer: '.test--triangle-explainer',
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
      closeExplainerButton: '.test--radar-explainer-close-button',
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
      radarChartPlaceHolder: '.test--officer--radar-chart-placeholder',
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

  open(id=1) {
    super.open(`/officer/${id}/`);
    browser.element('body').waitForVisible();
  }
}

module.exports = new OfficerPage();
