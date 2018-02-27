'use strict';

import Section from './sections/section';
import LoginScreen from './sections/login-screen';
import { retry } from '../utils';


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

  toggleEditMode(editModeOn) {
    retry(
      () => {
        browser.keys('Escape');
        browser.pause(10);
      },
      () => {
        return editModeOn ? this.currentBasePath.match(/^edit/) == null : this.currentBasePath.match(/^edit/) !== null;
      }
    );
  }

  openEditMode() {
    this.toggleEditMode(false);
    this.loginScreen.login();
  }

  isRichTextEditorEmpty(element) {
    return element.element('.public-DraftEditorPlaceholder-root').state === 'success';
  }

  selectText(selector) {
    browser.execute(function (selector) {

      function getElementByXPath(path, contextNode) {
        return document.evaluate(
          path, contextNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
        ).singleNodeValue;
      }

      function getElementBySelector(selector) {
        if (selector.startsWith('/')) {
          return getElementByXPath(selector, document);
        } else {
          return document.querySelector(selector);
        }
      }

      const element = getElementBySelector(selector);

      const firstTextElement = getElementByXPath('.//span[text()]', element);
      const lastTextElement = getElementByXPath('(.//span[text()])[last()]', element);

      const selection = window.getSelection();
      const range = document.createRange();

      const startIndex = 0;
      const endIndex = lastTextElement.childNodes.length;

      range.setStart(firstTextElement, startIndex);
      range.setEnd(lastTextElement, endIndex);

      selection.empty();
      selection.addRange(range);
      selection.empty();
      selection.addRange(range);
    }, selector);
  }
}
