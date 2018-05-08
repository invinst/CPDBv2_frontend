import { each } from 'lodash';

import Page from './page';
import Section from './sections/section';
import Header from './sections/officer-page-header';


class SummarySection extends Section {
  constructor() {
    super();

    const fields = ['yearOfBirth', 'race', 'sex', 'badge', 'rank', 'unit', 'career'];

    const elementGetters = {
      officerName: '.test--summary-section-officer-name',
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
      all: '(//div[@class="test--dropdown-menu-item"])[1]',
      crs: '(//div[@class="test--dropdown-menu-item"])[2]',
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
    });
  }
}

class CoaccusalsSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      firstCoaccusalGroupName: '//span[@class="test--coaccusals-group-name"][1]',
      firstCoaccusalCard: '.test--coaccusal-card',
    });
  }
}

class TabbedPaneSection extends Section {
  timelineSection = new TimelineSection();
  coaccusalsSection = new CoaccusalsSection();

  constructor() {
    super();

    this.prepareElementGetters({
      menu: '.test--tabbed-pane-section-menu',
      timelineTabName: '//span[@class="test--tabbed-pane-tab-name"][1]',
      summaryTabName: '//span[@class="test--tabbed-pane-tab-name"][2]',
      coaccusalsTabName: '//span[@class="test--tabbed-pane-tab-name"][4]',
    });
  }
}

class RadarChartSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      svg: '.test--radar',
      axis: '.test--radar-axis-wrapper',
      wrapper: '.test--radar-wrapper',
      legend: '.test--radar-legend-content',
      lastAxisTitle: '.test--radar-axis-text:last-of-type'
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

  open() {
    super.open('/officer/1/');
    browser.element('body').waitForVisible();
  }
}

module.exports = new OfficerPage();
