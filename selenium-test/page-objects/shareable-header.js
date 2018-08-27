'use strict';

import Page from './page';
import Section from './sections/section';

class Breadcrumbs extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      mainElement: '.test--breadcrumbs',
      items: '.test--breadcrumbs-item',
      firstItem: '(//li[@class="test--breadcrumbs-item"])[1]',
      secondItem: '(//li[@class="test--breadcrumbs-item"])[2]',
      thirdItem: '(//li[@class="test--breadcrumbs-item"])[3]',
    });
  }
}

class ShareButton extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      mainElement: '.test--shareable-header--share-link',
      menu: '.test--shareable-header--share-menu'
    });
  }
}


class ShareableHeader extends Page {
  breadcrumbs = new Breadcrumbs();
  shareButton = new ShareButton();
}


module.exports = new ShareableHeader();
