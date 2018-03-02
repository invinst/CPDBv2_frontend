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
    };
    each(fields, (field, index) => {
      elementGetters[`${field}Label`] = `(//span[@class="test--field-label"])[${index + 1}]`;
      elementGetters[`${field}Value`] = `(//span[@class="test--field-value"])[${index + 1}]`;
      elementGetters[`${field}ExtraInfo`] = `(//span[@class="test--field-extra-info"])[${index + 1}]`;
    });

    this.prepareElementGetters(elementGetters);
  }
}

class OfficerSummaryPage extends Page {
  header = new Header();
  summarySection = new SummarySection();

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
