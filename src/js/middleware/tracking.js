import {
  OPEN_BOTTOM_SHEET_WITH_REPORT,
  OPEN_BOTTOM_SHEET_WITH_FAQ
} from 'utils/constants';
import { EXPAND_FAQ } from 'actions/faq-page/index';
import { trackIntercomClickedFaqEvent, trackIntercomClickedReportEvent, trackInternalEvent } from 'utils/tracking';
import { getField, plainTextValueToString, multilineTextValueToArray } from 'utils/draft';
import { find } from 'lodash';

const EVENTS = {
  [OPEN_BOTTOM_SHEET_WITH_REPORT]: (store, action) => {
    const report = action.payload;
    trackIntercomClickedReportEvent(report.id, report.title);
    trackInternalEvent('report-click', { 'id': report.id, 'title': report.title });
  },

  [EXPAND_FAQ]: (store, action) => {
    const { id, question, answer } = action.payload;
    trackIntercomClickedFaqEvent(id, question, answer);
    trackInternalEvent('faq-click', { 'id': id, 'question': question, 'answer': answer });
  },

  [OPEN_BOTTOM_SHEET_WITH_FAQ]: (store, action) => {
    const faqs = store.getState().faqs;
    const faq = find(faqs, ['id', action.payload]);
    const question = plainTextValueToString(getField(faq.fields, 'question').value);
    const answer = multilineTextValueToArray(getField(faq.fields, 'answer').value).join('\n');
    trackIntercomClickedFaqEvent(faq.id, question, answer);
    trackInternalEvent('faq-click', { 'id': faq.id, 'question': question, 'answer': answer });
  }
};


export default store => next => action => {
  if (EVENTS.hasOwnProperty(action.type)) {
    EVENTS[action.type](store, action);
  }

  return next(action);
};
