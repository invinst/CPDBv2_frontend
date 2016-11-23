import { createSelector } from 'reselect';
import { map } from 'lodash';

import { getField, plainTextValueToString, multilineTextValueToArray } from 'utils/draft';


const getFAQs = state => state.faqs;

export const faqTransform = faq => {
  return {
    id: faq.id,
    question: plainTextValueToString(getField(faq.fields, 'question').value),
    answer: multilineTextValueToArray(getField(faq.fields, 'answer').value)
  };
};

export const faqsSelector = createSelector(getFAQs, faqs => map(faqs, faq => faqTransform(faq)));
