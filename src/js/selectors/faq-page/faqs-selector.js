import { createSelector } from 'reselect';
import { map } from 'lodash';

import { getPaginationInfo } from 'selectors/common/pagination-selector';
import { getField, plainTextValueToString, multilineTextValueToArray } from 'utils/draft';


const getIsRequesting = state => state.faqPage.isRequesting;
const getFAQs = state => state.faqs;

export const faqTransform = faq => {
  return {
    id: faq.id,
    question: plainTextValueToString(getField(faq.fields, 'question').value),
    answer: multilineTextValueToArray(getField(faq.fields, 'answer').value)
  };
};

export const faqsSelector = createSelector(getFAQs, faqs => map(faqs, faq => faqTransform(faq)));

export const paginationSelector = createSelector(getFAQs, getPaginationInfo);

export const dataAvailableSelector = createSelector(
  getIsRequesting,
  faqsSelector,
  (isRequesting, faqs) => {
    return !isRequesting && faqs.length > 0;
  }
);
