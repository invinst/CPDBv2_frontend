import { each } from 'lodash';

import Page from './page';
import Section from './sections/section';


class Header extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      unitName: '.test--unit-name',
      summaryButton: '//a[@class="test--header-button"][text()="Summary"]',
      activeButton: '.test--header-button-active'
    });
  }
}

class MemberAggregateSection extends Section {
  constructor() {
    super();

    const facetFields = ['race', 'age', 'gender'];
    const facetGetters = {};
    each(facetFields, field => {
      const parentClassName = `//div[@class="test--${field}-block"]`;
      facetGetters[`${field}Name`] = `${parentClassName}/span[@class="test--member-aggregate-title"]`;
      facetGetters[`${field}EntryCount`] = `${parentClassName}/div/span[@class="test--member-aggregate-count"]`;
      facetGetters[`${field}EntryName`] = `${parentClassName}/div/span[@class="test--member-aggregate-name"]`;
    });

    this.prepareElementGetters({
      status: '.test--member-aggregate-status',
      ...facetGetters
    });
  }
}


class ComplaintAggregateSection extends Section {
  constructor() {
    super();

    const facetFields = ['category', 'race', 'age', 'gender'];
    const facetGetters = {};
    each(facetFields, (field, index) => {
      facetGetters[`${field}Name`] = `(//div[@class="test--aggregate-facet-name"])[${index + 1}]`;
      facetGetters[`${field}EntryCount`] = `(//span[@class="test--entry-count"])[${index + 1}]`;
      facetGetters[`${field}EntrySustainedCount`] = `(//span[@class="test--entry-sustained-count"])[${index + 1}]`;
      facetGetters[`${field}EntryName`] = `(//span[@class="test--entry-name"])[${index + 1}]`;
    });

    this.prepareElementGetters({
      status: '.test--complaint-aggregate-status',
      ...facetGetters
    });
  }
}

class UnitSummaryPage extends Page {
  header = new Header();
  memberAggregateSection = new MemberAggregateSection();
  complaintAggregateSection = new ComplaintAggregateSection();

  open() {
    super.open('/unit/001/');
  }
}

module.exports = new UnitSummaryPage();
