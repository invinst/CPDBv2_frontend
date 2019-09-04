'use strict';

import Page from './page';
import Section from './sections/section';


class EmbedOfficersCarouselSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      leftArrow: '//div[@class="test--embed-officers-carousel"]//*[contains(@class, "test--carousel-arrow-left")]',
      rightArrow: '//div[@class="test--embed-officers-carousel"]//*[contains(@class, "test--carousel-arrow-right")]',
      cards: '//div[@class="test--embed-officers-carousel"]//a[contains(@class, "officer-card__officer-card")]',
    });
  }
}

class EmbedOfficersPage extends Page {
  embedOfficersCarousel = new EmbedOfficersCarouselSection();

  constructor() {
    super();

    this.prepareElementGetters({
      title: '.test--embed-officers-title',
      description: '.test--embed-officers-description',
    });
  }

  open(url) {
    super.open(url);
    $('body').waitForDisplayed();
  }
}

module.exports = new EmbedOfficersPage();
