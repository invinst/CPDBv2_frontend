'use strict';

import Page from './page';
import Section from './sections/section';

class Breadcrumbs extends Section {
  constructor(parentSelector='') {
    super(parentSelector, '//div[contains(@class, "breadcrumb__")]'),
    this.prepareElementGetters({
      items: '//*[contains(@class, "breadcrumb-item")]',
      firstItem: '(//*[contains(@class, "breadcrumb-item")])[1]',
      secondItem: '(//*[contains(@class, "breadcrumb-item")])[2]',
      thirdItem: '(//*[contains(@class, "breadcrumb-item")])[3]',
    });
  }
}

class HeaderButton extends Section {
  constructor(parentSelector='') {
    super(parentSelector, '//div[contains(@class, "header-button")]');
    this.prepareElementGetters({
      menu: '//div[contains(@class, "share-menu")]',
    });
  }
}


class ShareableHeader extends Page {
  breadcrumbs = new Breadcrumbs();
  headerButton = new HeaderButton();
}


module.exports = new ShareableHeader();
