import {
  OPEN_BOTTOM_SHEET_WITH_STORY,
  OPEN_BOTTOM_SHEET_WITH_FAQ
} from 'actions/landing-page/bottom-sheet';
import { SUBSCRIBE_EMAIL_REQUEST } from 'actions/landing-page/vftg';


export default store => next => action => {
  switch (action.type) {
    case OPEN_BOTTOM_SHEET_WITH_STORY:
      global.ga('send', 'event', 'story', 'open', action.payload.title, action.payload.id);
      break;
    case OPEN_BOTTOM_SHEET_WITH_FAQ:
      global.ga('send', 'event', 'faq', 'open', action.payload.title, action.payload.id);
      break;
    case SUBSCRIBE_EMAIL_REQUEST:
      global.ga('send', 'event', 'VFTG section', 'email sign-up', action.payload);
      break;
  }
  return next(action);
};
