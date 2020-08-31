'use strict';

import Page from './page';
import Section from './sections/section';
import { Header } from './sections/header';
import Footer from './sections/footer';


class CitySummary extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      allegationDiscipline: '.allegation-discipline-count',
      mostCommonComplaints: '.test--most-common-complaints',
    });
  }
}

class Dropdown extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      dropdownUpArrow: '.test--dropdown-up-arrow',
      textInput: '.test--dropdown-text-input',
      dropdownItems: '.test--dropdown-item',
    });
  }
}

class HeatMapSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      dropdownPlaceholder: '.test--dropdown-placeholder',
      complaintCategory: '.complaint-category',
      searchTermsLink: '.test--dropdown-search-terms',
    });
  }

  citySummary = new CitySummary();
  dropdown = new Dropdown();
}

class EmbeddableHeatMapPage extends Page {
  header = new Header();
  footer = new Footer();
  heatMapSection = new HeatMapSection();

  open() {
    super.open('/embed/map');
  }
}

module.exports = new EmbeddableHeatMapPage();
