import { createSelector } from 'reselect';


const getIsRequesting = state => state.landingPage.faqApp.isRequesting;

const getFAQs = state => state.landingPage.faqApp.faqs;

export const faqsSelector = createSelector(getFAQs, (faqs) => {
  return faqs.slice(0).map((faq, ind) => ({
    id: faq.id,
    title: faq.title,
    paragraphs: faq.body && faq.body.map(p => p.value)
  }));
});

export const dataAvailableSelector = createSelector(
  getIsRequesting,
  faqsSelector,
  (isRequesting, faqs) => {
    return !isRequesting && faqs.length >= 3;
  }
);
