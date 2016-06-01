import { createSelector } from 'reselect';


const getIsRequesting = state => state.faqApp.isRequesting;

const getFAQs = state => state.faqApp.faqs;

export const faqsSelector = createSelector(getFAQs, (faqs) => {
  return faqs.slice(0);
});

export const dataAvailableSelector = createSelector(
  getIsRequesting,
  faqsSelector,
  (isRequesting, faqs) => {
    return !isRequesting && faqs.length >= 3;
  }
);
