import {
  OPEN_BOTTOM_SHEET_WITH_REPORT,
  OPEN_BOTTOM_SHEET_WITH_FAQ,
  SUGGESTION_SINGLE_REQUEST_SUCCESS,
  SUGGESTION_REQUEST_SUCCESS,
  CHANGE_SEARCH_QUERY
} from 'utils/constants';
import { EXPAND_FAQ } from 'actions/faq-page/index';
import {
  trackIntercomClickedFaqEvent, trackIntercomClickedReportEvent, trackInternalEvent, throttledGA
} from 'utils/tracking';
import { getField, plainTextValueToString, multilineTextValueToArray } from 'utils/draft';
import { find, reduce, values } from 'lodash';


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
  },

  '@@router/LOCATION_CHANGE': (store, action) => {
    global.ga('send', 'pageview', { page: action.payload.pathname });
  },

  [CHANGE_SEARCH_QUERY]: (store, action) => {
    throttledGA('send', 'event', {
      eventCategory: 'search',
      eventAction: 'change_query',
      eventLabel: action.payload
    });
  },

  [SUGGESTION_SINGLE_REQUEST_SUCCESS]: (store, action) => {
    global.ga('send', 'event', {
      eventCategory: 'search',
      eventAction: 'num_results',
      eventValue: action.payload.count
    });
  },

  [SUGGESTION_REQUEST_SUCCESS]: (store, action) => {
    const count = reduce(values(action.payload), (sum, array) => sum + array.length, 0);
    global.ga('send', 'event', {
      eventCategory: 'search',
      eventAction: 'num_results',
      eventValue: count
    });
  }
};


export default store => next => action => {
  if (EVENTS.hasOwnProperty(action.type)) {
    EVENTS[action.type](store, action);
  }

  return next(action);
};
