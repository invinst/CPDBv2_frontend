'use strict';

import Page from './page';
import Section from './sections/section';
import { TopHeader, StickyHeader } from './sections/header';
import Footer from './sections/footer';
import RichTextToolbar from './sections/rich-text-toolbar';


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
      leftArrow: '//div[@class="test--landing-carousel-activity"]//*[@class="test--carousel-arrow-left"]',
      rightArrow: '//div[@class="test--landing-carousel-activity"]//*[@class="test--carousel-arrow-right"]',
      officerCards: '//div[@class="test--landing-carousel-activity"]//a[@class="test--officer-card"]',
      pairCards: '//div[@class="test--landing-carousel-activity"]//div[@class="test--pair-card"]',
      firstPairCard: '(//div[@class="test--landing-carousel-activity"]//div[@class="test--pair-card"])[1]',
      firstPairCardLeftHalf: '' +
        '((//div[@class="test--landing-carousel-activity"]' +
        '//div[@class="test--pair-card"])[1]' +
        '//a[@class="test--pair-card-half"])[1]',
      firstPairCardRightHalf: '' +
        '((//div[@class="test--landing-carousel-activity"]' +
        '//div[@class="test--pair-card"])[1]' +
        '//a[@class="test--pair-card-half"])[2]',
    });
  }
}

class OfficersByAllegationCarouselSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      leftArrow: '//div[@class="test--landing-carousel-allegation"]//*[@class="test--carousel-arrow-left"]',
      rightArrow: '//div[@class="test--landing-carousel-allegation"]//*[@class="test--carousel-arrow-right"]',
      cards: '//div[@class="test--landing-carousel-allegation"]//a[@class="test--officer-card"]'
    });
  }
}

class RecentDocumentCarouselSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      leftArrow: '//div[@class="test--landing-carousel-document"]//*[@class="test--carousel-arrow-left"]',
      rightArrow: '//div[@class="test--landing-carousel-document"]//*[@class="test--carousel-arrow-right"]',
      cards: '//div[@class="test--landing-carousel-document"]//a[@class="test--document-card"]'
    });
  }
}

class ComplaintSummariesCarouselSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      leftArrow: '//div[@class="test--landing-carousel-complaint"]//*[@class="test--carousel-arrow-left"]',
      rightArrow: '//div[@class="test--landing-carousel-complaint"]//*[@class="test--carousel-arrow-right"]',
      cards: '//div[@class="test--landing-carousel-complaint"]//a[@class="test--complaint-summary-card"]'
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
      header: '.test--city-summary-header',
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
      firstOfficer: '(//a[@class="test--community-officer"])[1]'
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

class SearchSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      sectionSearchBox: '.test--search-section-search-box',
      sectionSearchTerm: '.test--search-section-term',
    });
  }
}

class LandingPage extends Page {
  topHeader = new TopHeader();
  stickyHeader = new StickyHeader();
  footer = new Footer();
  richTextToolbar = new RichTextToolbar();
  collaborateSection = new CollaborateSection();
  recentActivityCarousel = new RecentActivityCarouselSection();
  officersByAllegationCarousel = new OfficersByAllegationCarouselSection();
  complaintSummariesCarousel = new ComplaintSummariesCarouselSection();
  recentDocumentCarousel = new RecentDocumentCarouselSection();
  genericModalSection = new GenericModalSection();
  heatMapSection = new HeatMapSection();
  searchSection = new SearchSection();

  open() {
    super.open('/');
    browser.element('body').waitForVisible();
  }
}

module.exports = new LandingPage();
