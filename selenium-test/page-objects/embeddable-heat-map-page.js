'use strict';

import Page from './page';
import Section from './sections/section';
import { TopHeader } from './sections/header';
import Footer from './sections/footer';
import RichTextToolbar from './sections/rich-text-toolbar';


class CitySummary extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      allegationDiscipline: '.test--allegation-discipline-count',
      mostCommonComplaints: '.test--most-common-complaints'
    });
  }

  tapBottom() {
    browser.moveToObject('.test--city-summary', 100, 370);
    browser.buttonPress();
  }
}

class CommunityDetail extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      closeBtn: '.test--community-close-btn',
      allegationDiscipline: '.test--community-allegation-discipline',
      v1Link: '.test--community-v1-link',
      officers: '.test--community-officers'
    });
  }
}

class Dropdown extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      dropdownUpArrow: '.test--dropdown-up-arrow',
      textInput: '.test--dropdown-text-input',
      dropdownItems: '.test--dropdown-item'
    });
  }
}

class HeatMapSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      dropdownPlaceholder: '.test--dropdown-placeholder',
      complaintCategory: '.test--complaint-category',
      searchTermsLink: '.test--dropdown-search-terms'
    });
  }

  citySummary = new CitySummary();
  communityDetail = new CommunityDetail();
  dropdown = new Dropdown();
}

class EmbeddableHeatMapPage extends Page {
  topHeader = new TopHeader();
  footer = new Footer();
  richTextToolbar = new RichTextToolbar();
  heatMapSection = new HeatMapSection();

  open() {
    super.open('/');
  }
}

module.exports = new EmbeddableHeatMapPage();
