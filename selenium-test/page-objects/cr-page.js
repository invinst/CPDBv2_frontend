import Page from './page';
import Section from './sections/section';
import DocumentRequestModalSection from './sections/document-request-modal';


class AccusedOfficerCard extends Section {
  constructor() {
    super();

    const firstCardSelector = '(//*[@class="test--accused-card"])[1]';

    this.prepareElementGetters({
      element: firstCardSelector,
      rank: `${firstCardSelector}//div[@class="test--accused-card-rank"]`,
      name: `${firstCardSelector}//div[@class="test--accused-card-name"]`,
      metric: `${firstCardSelector}//div[@class="test--accused-card-metric"]`,
      percentile: `${firstCardSelector}//div[@class="test--accused-card-percentile"]`,
      demographic: `${firstCardSelector}//div[@class="test--accused-card-demographic"]`,
      category: `${firstCardSelector}//div[@class="test--accused-card-category"]`,
      outcome: `${firstCardSelector}//div[@class="test--accused-card-outcome"]`,
    });
  }
}

class AccusedOfficerSection extends Section {
  firstCard = new AccusedOfficerCard();

  constructor() {
    super();

    this.prepareElementGetters({
      title: '.test--accused-officer-title',
      lastCard: '(//*[@class="test--accused-card"])[last()]',
      showMoreButton: '.test--accused-officer-show-more',
      popup: '.test--accused-officer .popup',
      popupButton: '.test--accused-officer .test--popup-button',
      popupTitle: '.test--accused-officer .test--popup-title',
      popupText: '.test--accused-officer .test--popup-text',
      popupCloseButton: '.test--accused-officer .test--popup-close-button'
    });
  }

  cardCount() {
    return browser.elements('.test--accused-card').value.length;
  }
}

class SummarySection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      firstVictim: '(//*[@class="test--victims"])//div[@class="test--person-demographic"][1]',
      firstComplainant: '(//*[@class="test--complainant"])//div[@class="test--person-demographic"][1]',
      summary: '.test--summary'
    });
  }
}

class AttachmentCard extends Section {
  constructor() {
    super();

    const firstCardSelector = '(//*[@class="test--attachment-card"])[1]';

    this.prepareElementGetters({
      title: `${firstCardSelector}//div[@class="test--attachment-card-title"]`,
      element: firstCardSelector
    });
  }
}

class AttachmentsSection extends Section {
  firstCard = new AttachmentCard();

  constructor() {
    super();
    this.prepareElementGetters({
      documentRequestButton: '.test--attachment-request'
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
      firstItem: '(//*[@class="test--involvement-investigator"]//*[@class="test--officer-row"])[1]',
      popup: '.test--involvement-investigator .popup',
      popupButton: '.test--involvement-investigator .test--popup-button',
      popupTitle: '.test--involvement-investigator .test--popup-title',
      popupText: '.test--involvement-investigator .test--popup-text',
      popupCloseButton: '.test--involvement-investigator .test--popup-close-button'
    });
  }

  itemCount() {
    return browser.elements(
      '(//*[@class="test--involvement-investigator"]//*[@class="test--officer-row"])'
    ).value.length;
  }
}


class PoliceWitnessSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      firstItem: '(//*[@class="test--involvement-police_witness"]//*[@class="test--officer-row"])[1]',
      popup: '.test--involvement-police_witness .popup',
      popupButton: '.test--involvement-police_witness .test--popup-button',
      popupTitle: '.test--involvement-police_witness .test--popup-title',
      popupText: '.test--involvement-police_witness .test--popup-text',
      popupCloseButton: '.test--involvement-police_witness .test--popup-close-button'
    });
  }

  itemCount() {
    return browser.elements(
      '(//*[@class="test--involvement-police_witness"]//*[@class="test--officer-row"])'
    ).value.length;
  }
}


class LocationSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      address: '.test--location-address',
      locationType: '.test--location-type',
      beat: '.test--location-beat'
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
      `[${index}]`
    ].join(''));
  }
}


class DistanceDropdown extends Section {
  constructor() {
    super();
    this.optionClassName = 'test--dropdown-menu-item';
    this.prepareElementGetters({
      button: '.test--dropdown-button',
      options: `.${this.optionClassName}`
    });
  }

  getOption(value) {
    return browser.element([
      `//*[contains(@class, "${this.optionClassName}")`,
      ` and text()="${value}"]`
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
      title: '.test--cr-title',
      category: '.test--cr-category',
      investigationTimeline: '.test--investigator-timeline-text'
    });
  }

  open(id = 1000000) {
    super.open(`/complaint/${id}/1/`);
    browser.element('body').waitForVisible();
  }
}

module.exports = new CRPage();
