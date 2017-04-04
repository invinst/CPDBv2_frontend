import { disableBodyScroll, enableBodyScroll } from 'utils/dom';
import { isReportBottomSheetPath, isFAQBottomSheetPath, isOfficerBottomSheetPath } from 'utils/bottom-sheet';


export default store => next => action => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    const pathname = action.payload.pathname;
    if (isReportBottomSheetPath(pathname) || isFAQBottomSheetPath(pathname)
      || isOfficerBottomSheetPath(pathname)) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }
  }
  return next(action);
};
