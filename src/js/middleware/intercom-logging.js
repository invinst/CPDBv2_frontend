import {
  OPEN_BOTTOM_SHEET_WITH_REPORT,
  OPEN_BOTTOM_SHEET_WITH_FAQ
} from 'actions/bottom-sheet';
import { EXPAND_FAQ } from 'actions/faq-page/index';
import { trackClickedReportingItem, trackClickedFaqItem } from 'utils/intercom';
import { getField, plainTextValueToString, multilineTextValueToArray } from 'utils/draft';
import _ from 'lodash';


export default store => next => action => {
  if (action.type === OPEN_BOTTOM_SHEET_WITH_REPORT) {
    const report = action.payload;
    trackClickedReportingItem(report.id, report.title);
  }

  if (action.type === EXPAND_FAQ) {
    const { id, question, answer } = action.payload;
    trackClickedFaqItem(id, question, answer);
  }

  if (action.type === OPEN_BOTTOM_SHEET_WITH_FAQ) {
    const faqs = store.getState().faqs;
    const faq = _.find(faqs, ['id', action.payload]);
    const question = plainTextValueToString(getField(faq.fields, 'question').value);
    const answer = multilineTextValueToArray(getField(faq.fields, 'answer').value).join('\n');
    trackClickedFaqItem(faq.id, question, answer);
  }

  return next(action);
};
