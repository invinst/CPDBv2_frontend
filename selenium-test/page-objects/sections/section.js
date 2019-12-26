'use strict';

const { keys, forEach } = require('lodash');


export default class Section {
  constructor(parentSelector = '', mainElementSelector = '') {
    this.parentSelector = parentSelector;
    this.mainElementSelector = `${ this.parentSelector }${ mainElementSelector }`;
  }

  _buildSelector(rawSelector) {
    if (rawSelector.startsWith('(')) {
      return `(${ this.mainElementSelector }${ rawSelector.substring(1) }`;
    }
    return `${ this.mainElementSelector }${ rawSelector }`;
  }

  // If you want to use mainElement or parentSelector,
  // make sure all the child selectors are in XPath format
  prepareElementGetters(elements = {}) {
    elements.mainElement = '';
    forEach(keys(elements), key => {
      if (!Object.prototype.hasOwnProperty.call(this, key)) {
        if (typeof elements[key] === 'function') {
          Object.defineProperty(this, key, {
            value: new elements[key](this.mainElementSelector),
            writable: false,
          });
        } else if (typeof elements[key] === 'string') {
          const selector = this._buildSelector(elements[key]);
          if (selector) {
            Object.defineProperty(this, key, {
              get: function () {
                const element = $(selector);
                element.selector = selector;
                Object.defineProperty(element, 'count', {
                  get: function () {
                    return $$(selector).length;
                  },
                });
                return element;
              },
            });
          }
        }
      }
    });
  }
}
