import { createSelector } from 'reselect';
import { map } from 'lodash';

import { faqTransform } from 'selectors/faq-page/faqs-selector';


const getIsRequesting = state => state.landingPage.isRequesting;
const getFAQIds = state => state.landingPage.faqSection.faqs;
const getFAQs = state => state.faqs;

export const faqsSelector = createSelector(
  getFAQs,
  getFAQIds,
  (faqs, ids) => (map(ids, id => (faqTransform(faqs[id]))))
);

export const dataAvailableSelector = createSelector(
  getIsRequesting,
  getFAQIds,
  (isRequesting, faqIds) => {
    return !isRequesting && faqIds.length > 0;
  }
);
