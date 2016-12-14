import { disableBodyScroll, enableBodyScroll } from 'utils/dom';
import { isReportBottomSheetPath, isFAQBottomSheetPath } from 'utils/bottom-sheet';


export default store => next => action => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    if (isReportBottomSheetPath(action.payload.pathname) || isFAQBottomSheetPath(action.payload.pathname)) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }
  }
  return next(action);
};
