import { each } from 'lodash';

import Page from './page';
import Section from './sections/section';

class Header extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      officerName: '.test--officer-name',
      headerButton: '.test--header-button',
      headerActiveButton: '.test--header-button-active'
    });
  }
}

class SummarySection extends Section {
  constructor() {
    super();

    const fields = ['unit', 'dateOfAppt', 'rank', 'race', 'badge', 'sex'];
    const elementGetters = {};
    each(fields, (field, index) => {
      elementGetters[`${field}Label`] = `(//span[@class="test--field-label"])[${index + 1}]`,
      elementGetters[`${field}Value`] = `(//span[@class="test--field-value"])[${index + 1}]`;
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
      facetGetters[`${field}EntryName`] = `(//span[@class="test--entry-name"])[${index + 1}]`;
    });

    this.prepareElementGetters({
      title: '.test--aggregate-title',
      fadedTitle: '.test--aggregate-faded-title',
      count: '.test--aggregate-count',
      ...facetGetters
    });
  }
}

class OfficerSummaryPage extends Page {
  header = new Header();
  summarySection = new SummarySection();
  aggregateSection = new AggregateSection();

  open() {
    super.open('/officer/1/');
    browser.element('body').waitForVisible();
  }
}

module.exports = new OfficerSummaryPage();
