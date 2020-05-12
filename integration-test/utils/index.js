'use strict';


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

export const setupMockApiFile = (mockApiFile) => {
  browser.url('');
  browser.setLocalStorage('TEST_MOCK_API_FILE', mockApiFile);
};

export const restoreMockApiFile = () => {
  browser.removeLocalStorage('TEST_MOCK_API_FILE');
};

export const setupPinboardEnabled = (value) => {
  browser.url('');

  browser.setLocalStorage('PINBOARD_ENABLED', value);
};

export const restorePinboardEnabled = () => {
  browser.removeLocalStorage('PINBOARD_ENABLED');
};
