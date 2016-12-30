'use strict';

import Section from './section';


export default class Page extends Section {
  open(path) {
    browser.deleteCookie();
    browser.url('/' + path);
  }

  get currentBasePath() {
    const url = browser.getUrl();
    return url.replace(/https?:\/\/[^/]+/, '');
  }

  selectText(selector) {
    browser.execute(function (selector) {
      let element;

      if (selector.startsWith('/')) {
        element = document.evaluate(
          selector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      } else {
        element = document.querySelector(selector);
      }

      const startInd = 0;
      const endInd = element.children.length;

      const selection = window.getSelection();
      const range = document.createRange();

      range.setStart(element, startInd);
      range.setEnd(element, endInd);

      selection.removeAllRanges();
      selection.addRange(range);
      selection.removeAllRanges();
      selection.addRange(range);
    }, selector);
  }
}
