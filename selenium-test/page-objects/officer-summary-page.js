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

class TimelineSection extends Section {
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
    });
  }
}

class BiographySection extends Section {
  timelineSection = new TimelineSection();

  constructor() {
    super();

    this.prepareElementGetters({
      menu: '.test--biography-section-menu',
      timelineTabName: '//span[@class="test--biography-tab-name"][1]'
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


class OfficerSummaryPage extends Page {
  header = new Header();
  summarySection = new SummarySection();
  biographySection = new BiographySection();
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

module.exports = new OfficerSummaryPage();
