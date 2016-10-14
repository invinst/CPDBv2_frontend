import {
  OPEN_BOTTOM_SHEET_WITH_STORY, CLOSE_BOTTOM_SHEET, OPEN_BOTTOM_SHEET_WITH_FAQ
} from 'actions/landing-page/bottom-sheet';
import {
  OPEN_SIGNIN_MODAL, CLOSE_SIGNIN_MODAL
} from 'actions/authentication';
import { disableBodyScroll, enableBodyScroll } from 'utils/dom';

const disableTypes = [
  OPEN_BOTTOM_SHEET_WITH_STORY,
  OPEN_BOTTOM_SHEET_WITH_FAQ,
  OPEN_SIGNIN_MODAL
];

const enableTypes = [
  CLOSE_BOTTOM_SHEET,
  CLOSE_SIGNIN_MODAL
];

export default store => next => action => {
  if (disableTypes.indexOf(action.type) > -1) {
    disableBodyScroll();
  } else if (enableTypes.indexOf(action.type) > -1) {
    enableBodyScroll();
  }
  return next(action);
};
