'use strict';

import _ from 'lodash';


export const extractText = function (elements) {
  return _.map(elements.value, function (element) { return browser.elementIdText(element.ELEMENT).value; });
};
