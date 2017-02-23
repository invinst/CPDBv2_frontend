'use strict';

import { map } from 'lodash';


export const extractText = function (elements) {
  return map(elements.value, function (element) { return browser.elementIdText(element.ELEMENT).value; });
};

export const retry = function (action, valid, retries=3) {
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
