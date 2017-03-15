import { handleActions } from 'redux-actions';

import {
  isReportBottomSheetPath, isFAQBottomSheetPath, isOfficerBottomSheetPath, isBottomSheetPath
} from 'utils/bottom-sheet';
import { SEARCH_PATH } from 'utils/constants';


const generatePaths = pathname => {
  if (isReportBottomSheetPath(pathname)) {
    return ['/reporting/', pathname];
  }

  if (isFAQBottomSheetPath(pathname)) {
    return ['/faq/', pathname];
  }

  if (isOfficerBottomSheetPath(pathname)) {
    return [`/${SEARCH_PATH}`, pathname];
  }

  return [pathname];
};

export default handleActions({
  '@@router/LOCATION_CHANGE': (state, action) => {
    const pathname = action.payload.pathname.replace(/^\/edit(\/.*)/, '$1');

    if (!isBottomSheetPath(pathname) || !state.length) {
      return generatePaths(pathname);
    } else {
      return [...(isBottomSheetPath(state[state.length - 1]) ? state.slice(0, -1) : state), pathname];
    }
  }
}, []);
