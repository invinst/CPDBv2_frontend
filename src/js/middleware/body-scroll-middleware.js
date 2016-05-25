import { OPEN_BOTTOM_SHEET, CLOSE_BOTTOM_SHEET } from 'actions/bottom-sheet';
import { disableBodyScroll, enableBodyScroll } from 'utils/dom';


export default store => next => action => {
  if (action.type === OPEN_BOTTOM_SHEET) {
    disableBodyScroll();
  } else if (action.type === CLOSE_BOTTOM_SHEET) {
    enableBodyScroll();
  }
  return next(action);
};
