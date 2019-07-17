'use strict';

import Page from './page';
import Section from './sections/section';

class Breadcrumbs extends Section {
  constructor(parentSelector='') {
    super(parentSelector, '//ul[@class="breadcrumbs"]');
    this.prepareElementGetters({
      items: '//li[contains(@class, "breadcrumbs-item")]',
      firstItem: '(//li[contains(@class, "breadcrumbs-item")])[1]',
      secondItem: '(//li[contains(@class, "breadcrumbs-item")])[2]',
      thirdItem: '(//li[contains(@class, "breadcrumbs-item")])[3]',
    });
  }
}

class HeaderButton extends Section {
  constructor(parentSelector='') {
    super(parentSelector, '//div[contains(@class, "header-button")]');
    this.prepareElementGetters({
      menu: '//div[contains(@class, "share-menu")]'
    });
  }
}


class ShareableHeader extends Page {
  breadcrumbs = new Breadcrumbs();
  headerButton = new HeaderButton();
}


module.exports = new ShareableHeader();
