'use strict';

import Section from './sections/section';
import LoginScreen from './sections/login-screen';


export default class Page extends Section {
  constructor() {
    super();

    this.loginScreen = new LoginScreen();
  }

  open(path) {
    browser.deleteCookie();
    browser.url(path);
  }

  get currentBasePath() {
    const url = browser.getUrl();
    return url.replace(/https?:\/\/[^/]+/, '');
  }

  openEditMode() {
    browser.keys('Escape');
    this.loginScreen.login();
  }

  isRichTextEditorEmpty(element) {
    return element.element('.public-DraftEditorPlaceholder-root').state === 'success';
  }

  selectText(selector) {
    browser.execute(function (selector) {

      function getElementBySelector(selector) {
        if (selector.startsWith('/')) {
          return document.evaluate(selector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        } else {
          return document.querySelector(selector);
        }
      }

      const element = getElementBySelector(selector);

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
