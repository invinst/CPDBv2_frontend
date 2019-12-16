'use strict';

import Page from './page';
import CarouselSection from './sections/carousel';


class EmbedOfficersCarouselSection extends CarouselSection {
  constructor() {
    super(
      '',
      '//div[@class="test--embed-officers-carousel"]',
      '//a[contains(@class, "officer-card__officer-card")]',
    );
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
  }
}

module.exports = new EmbedOfficersPage();
