import {
  OPEN_BOTTOM_SHEET_WITH_REPORT, CLOSE_BOTTOM_SHEET, OPEN_BOTTOM_SHEET_WITH_FAQ
} from 'actions/bottom-sheet';
import { disableBodyScroll, enableBodyScroll } from 'utils/dom';

const disableTypes = [
  OPEN_BOTTOM_SHEET_WITH_REPORT,
  OPEN_BOTTOM_SHEET_WITH_FAQ
];

const enableTypes = [
  CLOSE_BOTTOM_SHEET
];

export default store => next => action => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    enableBodyScroll();
  }

  if (disableTypes.indexOf(action.type) > -1) {
    disableBodyScroll();
  } else if (enableTypes.indexOf(action.type) > -1) {
    enableBodyScroll();
  }
  return next(action);
};
