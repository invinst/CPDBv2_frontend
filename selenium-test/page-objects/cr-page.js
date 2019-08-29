import Page from './page';
import Section from './sections/section';
import DocumentRequestModalSection from './sections/document-request-modal';


class AccusedOfficerCard extends Section {
  constructor() {
    super();

    const firstCardSelector = '(//*[contains(@class, "coaccused-card__coaccused-card")])[1]';

    this.prepareElementGetters({
      element: firstCardSelector,
      rank: `${firstCardSelector}//p[contains(@class, "coaccused-card-rank")]`,
      name: `${firstCardSelector}//p[contains(@class, "coaccused-card-name")]`,
      metric: `${firstCardSelector}//span[@class="test--officer-card-metric"]`,
      percentile: `${firstCardSelector}//p[contains(@class, "test--officer-card-percentile")]`,
      demographic: `${firstCardSelector}//div[contains(@class, "officer-card-demographic")]`,
      category: `${firstCardSelector}//div[@class="accused-card-category"]`,
      outcome: `${firstCardSelector}//div[contains(@class, "accused-card-outcome")]`,
    });
  }
}

class AccusedOfficerSection extends Section {
  firstCard = new AccusedOfficerCard();

  constructor() {
    super();

    this.prepareElementGetters({
      title: '.accused-officer-title',
      lastCard: '(//*[contains(@class, "coaccused-card")])[last()]',
      showMoreButton: '.show-more-button-container',
      popup: '.test--accused-officer .popup',
      popupButton: '.test--accused-officer .popup-button',
      popupTitle: '.test--accused-officer .tooltip-title',
      popupText: '.test--accused-officer .tooltip-text',
      popupCloseButton: '.test--accused-officer .popup-close-button',
    });
  }

  cardCount() {
    return browser.elements('//a[contains(@class, "coaccused-card")]').value.length;
  }
}

class SummarySection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      firstVictim: '(//*[contains(@class, "test--victims")])//div[contains(@class, "demographic")][1]',
      firstComplainant: '(//*[contains(@class, "test--complainant")])//div[contains(@class, "demographic")][1]',
      summary: '.cr-summary',
    });
  }
}

class AttachmentCard extends Section {
  constructor() {
    super();

    const firstCardSelector = '(//*[contains(@class, "test--attachment-card")])[1]';

    this.prepareElementGetters({
      title: `${firstCardSelector}//div[contains(@class, "attachment-card-title")]`,
      element: firstCardSelector,
    });
  }
}

class AttachmentsSection extends Section {
  firstCard = new AttachmentCard();

  constructor() {
    super();
    this.prepareElementGetters({
      documentRequestButton: '.test--attachment-request',
    });
  }

  cardCount() {
    return browser.elements('.test--attachment-card').value.length;
  }
}


class InvestigatorSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      firstItem: '(//*[contains(@class, "test--involvement-investigator")]' +
        '//*[contains(@class, "test--officer-row")])[1]',
      secondItem: '(//*[contains(@class, "test--involvement-investigator")]' +
        '//*[contains(@class, "test--officer-row")])[2]',
    });
  }

  itemCount() {
    return browser.elements(
      '(//*[contains(@class, "test--involvement-investigator")]//*[contains(@class, "test--officer-row")])'
    ).value.length;
  }
}


class PoliceWitnessSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      firstItem: '(//*[contains(@class, "test--involvement-police_witness")]' +
        '//*[contains(@class, "test--officer-row")])[1]',
    });
  }

  itemCount() {
    return browser.elements(
      '(//*[contains(@class, "test--involvement-police_witness")]//*[contains(@class, "test--officer-row")])'
    ).value.length;
  }
}


class LocationSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      address: '.test--location-address',
      locationType: '.test--location-type',
      beat: '.test--location-beat',
    });
  }
}


class CarouselSection extends Section {
  constructor(match) {
    super();
    this.carouselClassName = `test--related-by-${match}-carousel`;
    this.cardClassName = 'test--carousel-card';
    this.prepareElementGetters({
      rightArrow: this.childCSSSelector('.test--carousel-arrow-right'),
      leftArrow: this.childCSSSelector('.test--carousel-arrow-left'),
      cards: this.childCSSSelector(`.${this.cardClassName}`),
    });
  }

  childCSSSelector(selector) {
    return `.${this.carouselClassName} ${selector}`;
  }

  cardAtIndex(index) {
    return browser.element([
      `(//*[contains(@class, "${this.carouselClassName}")]`,
      `//*[contains(@class, "${this.cardClassName}")])`,
      `[${index}]`,
    ].join(''));
  }
}


class DistanceDropdown extends Section {
  constructor() {
    super();
    this.optionClassName = 'dropdown-menu-item';
    this.prepareElementGetters({
      button: '.dropdown-button',
      options: `.${this.optionClassName}`,
    });
  }

  getOption(value) {
    return browser.element([
      `//*[contains(@class, "${this.optionClassName}")`,
      ` and text()="${value}"]`,
    ].join(''));
  }
}


class CRPage extends Page {
  accusedOfficers = new AccusedOfficerSection();
  summarySection = new SummarySection();
  attachments = new AttachmentsSection();
  investigator = new InvestigatorSection();
  policeWitness = new PoliceWitnessSection();
  location = new LocationSection();
  relatedByCategoriesCarousel = new CarouselSection('categories');
  distanceDropdown = new DistanceDropdown();
  documentRequestModal = new DocumentRequestModalSection();

  constructor() {
    super();

    this.prepareElementGetters({
      title: '.cr-title',
      category: '.test--cr-category-wrapper',
      incidentDate: '.cr-incident-date-value',
      investigationTimeline: '.investigator-timeline-text',
    });
  }

  open(id = 1000000) {
    super.open(`/complaint/${id}/1/`);
    browser.element('body').waitForVisible();
  }
}

module.exports = new CRPage();
