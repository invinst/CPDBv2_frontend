import { handleActions } from 'redux-actions';
import { map } from 'lodash';

import { isReportBottomSheetPath, isFAQBottomSheetPath, isOfficerBottomSheetPath } from 'utils/bottom-sheet';
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
    if (state.length === 0) {
      return generatePaths(pathname);
    }

    const lastElement = state[state.length - 1];
    if (lastElement === pathname) {
      return state;
    }

    const officerRegex = /\/officer\/(\d+)\/.*/;
    const lastElementMatch = lastElement.match(officerRegex);
    const pathnameMatch = pathname.match(officerRegex);

    if (lastElementMatch && pathnameMatch && lastElementMatch[1] === pathnameMatch[1]) {
      return map(state, (element, index) => index === state.length - 1 ? pathname : element);
    }

    if (action.payload.action === 'POP') {
      return state.slice(0, -1);
    }

    return [...state, pathname];
  }
}, []);
