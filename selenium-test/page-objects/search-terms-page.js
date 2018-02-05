'use strict';

import { map } from 'lodash';

import Page from './page';
import Section from './sections/section';


class NavigationBarSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      navigationItems: '.test--navigation-item'
    });
  }

  getNavigationItem(itemIndex) {
    return browser.element(`(//span[@class='test--navigation-item'])[${itemIndex}]`);
  }

  getNavigationItemNames() {
    return map(browser.elements(this.navigationItems.selector).value, ({ getText }) => (getText()));
  }
}


class CategoryMainPanelSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      categoryColumns: '.test--category-column',
      categoryItemChunks: '.test--category-item-chunk',
      firstCategoryItem: '.test--category-item'
    });
  }

  getColumnNames() {
    return map(browser.elements('.test--category-header').value, ({ getText }) => (getText()));
  }

  getItemsInChunk(columnIndex, chunkIndex) {
    // since title is the first child, the first test--category-column is the second child element
    return browser.elements(`
      .test--category-column:nth-child(${columnIndex + 1})
      .test--category-item-chunk:nth-child(${chunkIndex})
      .test--category-item
    `);
  }

  getItemsCountInChunk(columnIndex, chunkIndex) {
    return this.getItemsInChunk(columnIndex, chunkIndex).value.length;
  }

  getCategoryColum(columnIndex) {
    return browser.element(`.test--category-column:nth-child(${columnIndex})`);
  }

  getCategoryItemSelector(itemIndex) {
    return `(//div[@class='test--category-item'])[${itemIndex}]`;
  }

  getCategoryNameAtItem(itemIndex) {
    return browser.element(`${this.getCategoryItemSelector(itemIndex)}//div[@class='link--transition']`);
  }

  getCategoryDescriptionAtItem(itemIndex) {
    return browser.element(`${this.getCategoryItemSelector(itemIndex)}//div[@class='test--category-item-description']`);
  }
}

class BottomLinksSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      backToFrontPageLink: '.test--search-term-back-front-page-link',
      backToSearchPageLink: '.test--search-term-back-search-page-link'
    });
  }
}

class SearchPage extends Page {
  constructor() {
    super();
    this.navigationBar = new NavigationBarSection();
    this.categoryMainPanel = new CategoryMainPanelSection();
    this.bottomLinks = new BottomLinksSection();
  }

  open() {
    super.open('/search/terms/');
    browser.element('body').waitForVisible();
  }
}

module.exports = new SearchPage();
