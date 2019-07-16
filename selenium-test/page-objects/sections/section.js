'use strict';

const { keys, forEach } = require('lodash');


export default class Section {
  constructor(parentSelector='') {
    this.parentSelector = parentSelector;
  }

  _buildSelector(key, rawSelector, baseSelector) {
    if (key === 'mainElement') {
      return baseSelector;
    }
    if (rawSelector.startsWith('(')) {
      return `(${ baseSelector }${ rawSelector.substring(1) }`;
    }
    return `${baseSelector}${rawSelector}`;
  }

  // If you want to use mainElement or parentSelector,
  // make sure all the child selectors are in XPath format
  prepareElementGetters(elements={}) {
    const mainElementSelector = elements.mainElement || '';
    const baseSelector = `${this.parentSelector}${mainElementSelector}`;

    forEach(keys(elements), key => {
      if (typeof elements[key] === 'function') {
        Object.defineProperty(this, key, {
          value: new elements[key](baseSelector),
          writable: false
        });
      } else if (typeof elements[key] === 'string') {
        const selector = this._buildSelector(key, elements[key], baseSelector);
        Object.defineProperty(this, key, {
          get: function () {
            const element = browser.element(selector);
            element.count = browser.elements(selector).value.length;
            element.selector = selector;
            return element;
          }
        });
      }
    });
  }
}
