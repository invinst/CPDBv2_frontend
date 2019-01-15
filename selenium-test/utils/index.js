'use strict';

import { map } from 'lodash';


export const extractText = function (elements) {
  return map(elements.value, function (element) { return browser.elementIdText(element.ELEMENT).value; });
};

export const retry = function (action, valid, retries=1) {
  let attempts = 0;
  while (attempts < retries) {
    try {
      action();
      if (valid())
        break;
    } catch (e) {
      // empty
    }
    attempts += 1;
  }
};

export const reliableSetValue = function (element, value) {
  retry(
    () => element.setValue(value),
    () => element.getValue() === value
  );
};

export const getRequestCount = url => {
  const result = browser.execute(function (url) {
    return window.requestCount(url);
  }, url);
  return result.value;
};

export const selectText = selector => {
  browser.execute(function (selector) {

    function getElementByXPath(path, contextNode) {
      return document.evaluate(
        path, contextNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
      ).singleNodeValue;
    }

    function getElementBySelector(selector) {
      if (selector.startsWith('/') || selector.startsWith('(')) {
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
};

export const switchToRecentTab = () => {
  const handles = browser.getTabIds();
  const oldUrl = browser.getUrl();
  browser.switchTab(handles[handles.length - 1]);
  browser.waitUntil(() => browser.getUrl() !== oldUrl, 5000, 'Cannot switch to the recent tab.');
};
