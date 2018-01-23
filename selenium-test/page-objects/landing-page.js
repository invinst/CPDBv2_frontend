'use strict';

import Page from './page';
import Section from './sections/section';
import { TopHeader, StickyHeader } from './sections/header';
import Footer from './sections/footer';
import RichTextToolbar from './sections/rich-text-toolbar';
import BottomSheet from './sections/bottom-sheet';

class CollaborateSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      editToggle: '//div[@class="test--collaborate-section"]//a[@class="test--more-link"]',
      headerTitle: '//*[@class="test--collaborate-section-header"]//div[@data-block="true"]',
      cancelButton: '//div[@class="test--collaborate-section"]//a[contains(@class, "cancel-button")]',
      updateButton: '//div[@class="test--collaborate-section"]//a[contains(@class, "update-button")]',
      content: '//div[@class="test--collaborate-section-content"]//div[@data-contents="true"]'
    });
  }
}

class RecentActivityCarouselSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      leftArrow: '//div[@class="test--recent-activity"]//div[@class="test--carousel--arrow--left"]',
      rightArrow: '//div[@class="test--recent-activity"]//div[@class="test--carousel--arrow--right"]',
      cards: '//div[@class="test--recent-activity"]//a[@class="test--officer-card"]'
    });
  }
}

class OfficersByAllegationCarouselSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      leftArrow: '//div[@class="test--officers-by-allegation"]//div[@class="test--carousel--arrow--left"]',
      rightArrow: '//div[@class="test--officers-by-allegation"]//div[@class="test--carousel--arrow--right"]',
      cards: '//div[@class="test--officers-by-allegation"]//a[@class="test--officer-card"]'
    });
  }
}

class GenericModalSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      overlay: '//div[@class="test--generic-modal-overlay"]',
      legalDisclaimerTitle: '//p[text()="LEGAL DISCLAIMER"]'
    });
  }
}

class CitySummary extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      allegationDiscipline: '.test--allegation-discipline-count',
      mostCommonComplaints: '.test--most-common-complaints'
    });
  }

  tapBottom() {
    browser.moveToObject('.test--city-summary', 100, 320);
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
      dropdownItems: '.test--dropdown-item'
    });
  }
}

class HeatMapSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      dropdownPlaceholder: '.test--dropdown-placeholder',
      searchTermsLink: '.test--dropdown-search-terms'
    });
  }

  citySummary = new CitySummary();
  communityDetail = new CommunityDetail();
  dropdown = new Dropdown();
}

class LandingPage extends Page {
  topHeader = new TopHeader();
  stickyHeader = new StickyHeader();
  footer = new Footer();
  richTextToolbar = new RichTextToolbar();
  bottomSheet = new BottomSheet();
  collaborateSection = new CollaborateSection();
  recentActivityCarousel = new RecentActivityCarouselSection()
  officersByAllegationCarousel = new OfficersByAllegationCarouselSection()
  genericModalSection = new GenericModalSection();
  heatMapSection = new HeatMapSection();

  open() {
    super.open('/');
    browser.element('body').waitForVisible();
  }
}

module.exports = new LandingPage();
