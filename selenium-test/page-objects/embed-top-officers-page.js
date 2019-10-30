'use strict';

import Page from './page';
import CarouselSection from './sections/carousel';


class OfficersByAllegationCarouselSection extends CarouselSection {
  constructor() {
    super(
      '',
      '//div[contains(@class, "test--landing-carousel-allegation")]',
      '//a[contains(@class, "officer-card")]',
    );
  }
}

class EmbedTopOfficersPage extends Page {
  officersByAllegationCarousel = new OfficersByAllegationCarouselSection();

  open() {
    super.open('/embed/top-officers-page');
  }
}

module.exports = new EmbedTopOfficersPage();
