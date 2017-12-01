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
    return browser.elements(`
      .test--category-column:nth-child(${columnIndex})
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


class SearchPage extends Page {
  constructor() {
    super();
    this.navigationBar = new NavigationBarSection();
    this.categoryMainPanel = new CategoryMainPanelSection();
  }

  open() {
    super.open('/search/terms/');
    browser.element('body').waitForVisible();
  }
}

module.exports = new SearchPage();
