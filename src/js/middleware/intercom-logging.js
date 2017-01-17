import {
  OPEN_BOTTOM_SHEET_WITH_REPORT,
  OPEN_BOTTOM_SHEET_WITH_FAQ
} from 'actions/bottom-sheet';
import { EXPAND_FAQ } from 'actions/faq-page/index';
import { trackClickedReportingItem, trackClickedFaqItem } from 'utils/intercom';
import { getField, plainTextValueToString, multilineTextValueToArray } from 'utils/draft';
import { find } from 'lodash';

const INTERCOM_TRACKING_MAP = {
  [OPEN_BOTTOM_SHEET_WITH_REPORT]: (store, action) => {
    const report = action.payload;
    trackClickedReportingItem(report.id, report.title);
  },

  [EXPAND_FAQ]: (store, action) => {
    const { id, question, answer } = action.payload;
    trackClickedFaqItem(id, question, answer);
  },

  [OPEN_BOTTOM_SHEET_WITH_FAQ]: (store, action) => {
    const faqs = store.getState().faqs;
    const faq = find(faqs, ['id', action.payload]);
    const question = plainTextValueToString(getField(faq.fields, 'question').value);
    const answer = multilineTextValueToArray(getField(faq.fields, 'answer').value).join('\n');
    trackClickedFaqItem(faq.id, question, answer);
  }
};


export default store => next => action => {
  if (INTERCOM_TRACKING_MAP.hasOwnProperty(action.type)) {
    INTERCOM_TRACKING_MAP[action.type](store, action);
  }

  return next(action);
};
