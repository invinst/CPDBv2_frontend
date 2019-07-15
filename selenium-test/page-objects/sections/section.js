'use strict';

const { keys, forEach } = require('lodash');


export default class Section {
  // If you want to use mainElementSelector, make sure all the child selectors are in XPath format
  prepareElementGetters(elements={}) {
    if (this.mainElementSelector) {
      elements.mainElement = '';
    }
    forEach(keys(elements), key => {
      const val = this.mainElementSelector ? `${this.mainElementSelector}${elements[key]}` : elements[key];
      Object.defineProperty(this, key, { get: function () {
        const element = browser.element(val);
        element.count = browser.elements(val).value.length;
        element.selector = val;
        return element;
      } });
    });
  }
}
