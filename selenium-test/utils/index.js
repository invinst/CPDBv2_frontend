'use strict';

import { map } from 'lodash';


export const extractText = function (elements) {
  return map(elements.value, function (element) { return browser.elementIdText(element.ELEMENT).value; });
};
