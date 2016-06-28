import { createSelector } from 'reselect';

import { getPaginationInfo } from 'selectors/common/pagination-selector';


const getIsRequesting = state => state.landingPage.faqApp.isRequesting;

const getFAQs = state => state.landingPage.faqApp.faqs;

export const faqsSelector = createSelector(getFAQs, (faqs) => {
  return faqs.results.slice(0);
});

export const paginationSelector = createSelector(getFAQs, getPaginationInfo);

export const dataAvailableSelector = createSelector(
  getIsRequesting,
  faqsSelector,
  (isRequesting, faqs) => {
    return !isRequesting && faqs.length >= 3;
  }
);
