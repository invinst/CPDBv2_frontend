import {
  OPEN_BOTTOM_SHEET_WITH_REPORT,
  OPEN_BOTTOM_SHEET_WITH_FAQ
} from 'actions/bottom-sheet';
import { SUBSCRIBE_EMAIL_REQUEST } from 'actions/landing-page/vftg';
import { editModeOn } from 'selectors/edit-mode-on';
import { getField, plainTextValueToString } from 'utils/draft';


export default store => next => action => {
  if (editModeOn(window.location.pathname)) {
    return next(action);
  }
  const state = store.getState();

  if (action.type === OPEN_BOTTOM_SHEET_WITH_REPORT) {
    const report = state.reports[action.payload];
    const titleField = getField(report.fields, 'title');
    const title = plainTextValueToString(titleField.value);
    global.ga('send', 'event', 'story', 'open', title, action.payload);

  } else if (action.type === OPEN_BOTTOM_SHEET_WITH_FAQ) {
    const faq = state.faqs[action.payload];
    const questionField = getField(faq.fields, 'question');
    const question = plainTextValueToString(questionField.value);
    global.ga('send', 'event', 'faq', 'open', question, action.payload);

  } else if (action.type === SUBSCRIBE_EMAIL_REQUEST) {
    global.ga('send', 'event', 'VFTG section', 'email sign-up', action.payload.request.data.email);
  }

  return next(action);
};
