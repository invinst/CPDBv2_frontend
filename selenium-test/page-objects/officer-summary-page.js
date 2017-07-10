import { each } from 'lodash';

import Page from './page';
import Section from './sections/section';
import Header from './sections/officer-page-header';


class SummarySection extends Section {
  constructor() {
    super();

    const fields = ['rank', 'dateOfAppt', 'badge', 'race', 'salary', 'sex'];
    const elementGetters = {
      unitLabel: '//span[@class="test--field-unit-label"]',
      unitValue: '//span[@class="test--field-unit-value"]',
      unitLink: '//div[@class="test--view-profile-button"]'
    };
    each(fields, (field, index) => {
      elementGetters[`${field}Label`] = `(//span[@class="test--field-label"])[${index + 1}]`;
      elementGetters[`${field}Value`] = `(//span[@class="test--field-value"])[${index + 1}]`;
      elementGetters[`${field}Description`] = `(//span[@class="test--field-description"])[${index + 1}]`;
    });

    this.prepareElementGetters(elementGetters);
  }
}

class AggregateSection extends Section {
  constructor() {
    super();

    const facetFields = ['category', 'race', 'age', 'gender'];
    const facetGetters = {};
    each(facetFields, (field, index) => {
      facetGetters[`${field}`] = `(//div[@class="test--aggregate-facet"])[${index + 1}]`;
      facetGetters[`${field}Name`] = `(//div[@class="test--aggregate-facet-name"])[${index + 1}]`;
      facetGetters[`${field}EntryCount`] = `(//span[@class="test--entry-count"])[${index + 1}]`;
      facetGetters[`${field}EntrySustainedCount`] = `(//span[@class="test--entry-sustained-count"])[${index + 1}]`;
      facetGetters[`${field}EntryName`] = `(//span[@class="test--entry-name"])[${index + 1}]`;
    });

    this.prepareElementGetters({
      title: '.test--aggregate-title',
      fadedTitle: '.test--aggregate-faded-title',
      count: '.test--aggregate-count',
      sustainedCount: '.test--aggregate-sustained-count',
      ...facetGetters
    });
  }
}

class OfficerSummaryPage extends Page {
  header = new Header();
  summarySection = new SummarySection();
  aggregateSection = new AggregateSection();

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
