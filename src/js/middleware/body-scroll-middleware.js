import { OPEN_BOTTOM_SHEET_WITH_STORY, CLOSE_BOTTOM_SHEET } from 'actions/bottom-sheet';
import { disableBodyScroll, enableBodyScroll } from 'utils/dom';


export default store => next => action => {
  if (action.type === OPEN_BOTTOM_SHEET_WITH_STORY) {
    disableBodyScroll();
  } else if (action.type === CLOSE_BOTTOM_SHEET) {
    enableBodyScroll();
  }
  return next(action);
};
