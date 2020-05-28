'use strict';

import Page from './page';
import Section from './sections/section';
import { Header } from './sections/header';
import Footer from './sections/footer';
import RichTextToolbar from './sections/rich-text-toolbar';
import CarouselSection from './sections/carousel';

class RecentActivityCarouselSection extends CarouselSection {
  constructor() {
    const cardSelector = '//a[contains(@class, "officer-card")]';
    const pairCardSelector = '//div[contains(@class, "pairing-card")]';
    super(
      '',
      '//div[@class="test--landing-carousel-activity landing-page-carousel"]',
      cardSelector
    );
    this.prepareElementGetters({
      firstCard: '//div[contains(@class, "test--carousel--item")][1]//div[1]',
      firstRadarChart: '(//a[contains(@class, "officer-card__officer-card")][1])//*[name()="svg"][1]',
      pairCards: '//div[contains(@class, "pairing-card__pairing-card")]',
      firstPairCard: '(//div[contains(@class, "pairing-card__pairing-card")])[1]',
      firstPairCardLeftHalf: '(//div[contains(@class, "pairing-card__pairing-card")])[1]' +
        '//a[contains(@class, "half-pane")][1]',
      firstPairCardRightHalf: '(//div[contains(@class, "pairing-card__pairing-card")])[1]' +
        '//a[contains(@class, "half-pane")][2]',
      firstPairCardPinButton: '(//div[contains(@class, "pairing-card__pairing-card")])[1]' +
        '//div[contains(@class, "item-pin-button__item-pin-button")]',
      jeromeFinniganPinButton: (
        cardSelector +
        '[.//p[contains(@class, "officer-card-name") and text()="Jerome Finnigan"]]' +
        '//div[contains(@class, "item-pin-button__item-pin-button")]'
      ),
      jeromeFinniganPairCardPinButton: (
        pairCardSelector +
        '[.//div[contains(@class, "officer-info-name") and text()="Jerome Finnigan"]]' +
        '//div[contains(@class, "item-pin-button__item-pin-button")]'
      ),
    });
  }
}

class OfficersByAllegationCarouselSection extends CarouselSection {
  carouselSelector = '.test--landing-carousel-allegation > div:nth-child(2)';

  constructor() {
    const cardSelector = '//a[contains(@class, "officer-card")]';
    super(
      '',
      '//div[@class="test--landing-carousel-allegation landing-page-carousel"]',
      cardSelector
    );

    this.prepareElementGetters({
      edwardMayPinButton: (
        cardSelector +
        '[.//p[contains(@class, "officer-card-name") and text()="Edward May"]]' +
        '//div[contains(@class, "item-pin-button__item-pin-button")]'
      ),
      edwardMayRadarChart: (
        cardSelector +
          '//p[contains(@class, "officer-card-name") and text()="Edward May"]' +
          '/../../../..//*[name()="svg" and contains(@class, "radar")]'
      ),
    });
  }

  getNthCardSelector(index) {
    return $('(//div[@class="test--landing-carousel-allegation landing-page-carousel"]' +
      `//a[contains(@class, "officer-card")])[${index}]`);
  }
}

class RecentDocumentCarouselSection extends CarouselSection {
  constructor() {
    const cardSelector = '//a[contains(@class, "document-card__document-card")]';
    super(
      '',
      '//div[@class="test--landing-carousel-document landing-page-carousel"]',
      cardSelector
    );

    this.prepareElementGetters({
      domesticPinButton: (
        cardSelector +
        '[.//div[contains(@class, "document-card-description-category") and text()="Domestic"]]' +
        '//div[contains(@class, "item-pin-button__item-pin-button")]'
      ),
    });
  }
}

class ComplaintSummariesCarouselSection extends CarouselSection {
  constructor() {
    const cardSelector = '//a[contains(@class, "complaint-summary-card")]';
    super(
      '',
      '//div[@class="test--landing-carousel-complaint landing-page-carousel"]',
      cardSelector
    );

    this.prepareElementGetters({
      criminalMisconductPinButton: (
        cardSelector +
        '[.//div[contains(@class, "complaint-summary-card-title-category") and text()="Criminal Misconduct"]]' +
        '//div[contains(@class, "item-pin-button__item-pin-button")]'
      ),
    });
  }
}

class GenericModalSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      overlay: '//div[contains(@class, "generic-modal__generic-modal")]',
      legalDisclaimerTitle: '//p[text()="LEGAL DISCLAIMER"]',
      iUnderstandLink: '.i-understand-link',
    });
  }
}

class CitySummary extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      header: '.test--city-summary-header',
      allegationDiscipline: '.test--allegation-discipline-count',
      mostCommonComplaints: '.test--most-common-complaints',
    });
  }

  tapBottom() {
    $('.test--city-summary').clickAt(100, 370);
  }
}

class CommunityDetail extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      closeBtn: '.test--community-close-btn',
      allegationDiscipline: '.test--community-allegation-discipline',
      v1Link: '.test--community-v1-link',
      firstOfficer: '(//a[@class="test--community-officer"])[1]',
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
      complaintCategory: '.test--complaint-category',
      searchTermsLink: '.test--dropdown-search-terms',
    });
  }

  citySummary = new CitySummary();
  communityDetail = new CommunityDetail();
  dropdown = new Dropdown();
}

class SearchSection extends Section {
  constructor(parentSelector='') {
    super(parentSelector, '//div[contains(@class, "search-box__search-box")]');
    this.prepareElementGetters({
      sectionSearchTerm: '//span[@class="search-box-term"]',
    });
  }
}

class PinboardIntroductionSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      body: '.pinboard-button-introduction',
      closeButton: '.pinboard-button-introduction-close-btn',
      tryItButton: '.try-it-btn',
      pinboardButton: '//div[contains(@class, "header-links")]//div[contains(@class, "pinboard-button")]',
    });
  }
}

class LandingPage extends Page {
  header = new Header();
  footer = new Footer();
  richTextToolbar = new RichTextToolbar();
  recentActivityCarousel = new RecentActivityCarouselSection();
  officersByAllegationCarousel = new OfficersByAllegationCarouselSection();
  complaintSummariesCarousel = new ComplaintSummariesCarouselSection();
  recentDocumentCarousel = new RecentDocumentCarouselSection();
  genericModalSection = new GenericModalSection();
  heatMapSection = new HeatMapSection();
  searchSection = new SearchSection();
  pinboardIntroduction = new PinboardIntroductionSection();

  constructor() {
    super();
    this.prepareElementGetters({
      toast: '.Toastify__toast-body',
      lastToast: '(//div[contains(@class, "Toastify__toast-body")])[last()]',
      secondLastToast: '(//div[contains(@class, "Toastify__toast-body")])[last() - 1]',
    });
  }

  open(login = false) {
    super.open('/');
    if (login) {
      browser.keys('Escape');
      this.loginScreen.login();
    }
  }
}

module.exports = new LandingPage();
