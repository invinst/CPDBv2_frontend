import Page from './page';
import Section from './sections/section';


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
  firstCard = new AccusedOfficerCard()

  constructor() {
    super();

    this.prepareElementGetters({
      title: '.test--accused-officer-title',
      lastCard: '(//*[@class="test--accused-card"])[last()]',
      showMoreButton: '.test--accused-officer-show-more'
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
  firstCard = new AttachmentCard()

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
      firstItemName: '(//*[@class="test--investigator-item"])[1]//div[@class="test--investigator-item-title"]'
    });
  }

  itemCount() {
    return browser.elements('.test--investigator-item').value.length;
  }
}


class PoliceWitnessSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      firstItemName: '(//*[@class="test--police-witness-item"])[1]//div[@class="test--police-witness-item-title"]',
      firstItemMetric: '(//*[@class="test--police-witness-item"])[1]//div[@class="test--police-witness-item-metric"]',
    });
  }

  itemCount() {
    return browser.elements('.test--police-witness-item').value.length;
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


class DocumentRequestModalSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      overlay: '//div[@class="test--generic-modal-overlay"]',
      content: '.test--generic-modal-content',
      emailInput: '//div[@class="test--generic-modal-content"]//input[@placeholder="Your email"]',
      submitButton: '//div[@class="test--generic-modal-content"]//input[@type="submit"]',
      messageBox: '.test--request-document-modal--message',
    });
  }
}

class CRPage extends Page {
  accusedOfficers = new AccusedOfficerSection();
  summarySection = new SummarySection();
  attachments = new AttachmentsSection();
  investigator = new InvestigatorSection();
  policeWitness = new PoliceWitnessSection();
  location = new LocationSection();
  documentRequestModal = new DocumentRequestModalSection();

  constructor() {
    super();

    this.prepareElementGetters({
      title: '.test--cr-title',
      investigationTimeline: '.test--investigator-timeline-text'
    });
  }

  open(id = 1000000) {
    super.open(`/complaint/${id}/1/`);
    browser.element('body').waitForVisible();
  }
}

module.exports = new CRPage();
