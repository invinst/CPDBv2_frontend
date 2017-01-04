'use strict';

const { keys, forEach } = require('lodash');


export default class Section {
  prepareElementGetters(elements) {
    forEach(keys(elements), key => {
      const val = elements[key];
      Object.defineProperty(this, key, { get: function () {
        const element = browser.element(val);
        element.count = browser.elements(val).value.length;
        element.selector = val;
        return element;
      } });
    });
  }
}
