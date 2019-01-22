'use strict';

import Page from './page';
import Section from './sections/section';

class Breadcrumbs extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      mainElement: '.breadcrumbs',
      items: '.breadcrumbs-item',
      firstItem: '(//li[@class="breadcrumbs-item"])[1]',
      secondItem: '(//li[@class="breadcrumbs-item"])[2]',
      thirdItem: '(//li[@class="breadcrumbs-item"])[3]',
    });
  }
}

class ShareButton extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      mainElement: '.share-button-link',
      menu: '.test--shareable-header--share-menu'
    });
  }
}


class ShareableHeader extends Page {
  breadcrumbs = new Breadcrumbs();
  shareButton = new ShareButton();
}


module.exports = new ShareableHeader();
