'use strict';

import Page from './page';
import Section from './sections/section';


class OfficersByAllegationCarouselSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      leftArrow: '//div[contains(@class, "test--landing-carousel-allegation")]' +
        '//*[contains(@class, "test--carousel-arrow-left")]',
      rightArrow: '//div[contains(@class, "test--landing-carousel-allegation")]' +
        '//*[contains(@class, "test--carousel-arrow-right")]',
      cards: '//div[contains(@class, "test--landing-carousel-allegation")]//a[contains(@class, "test--officer-card")]'
    });
  }
}

class EmbedTopOfficersPage extends Page {
  officersByAllegationCarousel = new OfficersByAllegationCarouselSection();

  open() {
    super.open('/embed/top-officers-page');
    browser.element('body').waitForVisible();
  }
}

module.exports = new EmbedTopOfficersPage();
