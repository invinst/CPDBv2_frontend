import { disableBodyScroll, enableBodyScroll } from 'utils/dom';
import { isReportBottomSheetPath } from 'utils/bottom-sheet';


export default store => next => action => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    const pathname = action.payload.pathname;
    if (isReportBottomSheetPath(pathname)) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }
  }
  return next(action);
};
