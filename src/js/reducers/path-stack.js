import { handleActions } from 'redux-actions';

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

const isBottomSheet = pathname => (
  isReportBottomSheetPath(pathname) || isFAQBottomSheetPath(pathname) || isOfficerBottomSheetPath(pathname));

const isSameEntity = (path1, path2) => {
  if (!path1 || !path2) return false;
  const entity1 = path1.replace(/.*(\/\w+\/\d+).*/, '$1');
  const entity2 = path2.replace(/.*(\/\w+\/\d+).*/, '$1');
  return entity1 === entity2;
};

export default handleActions({
  '@@router/LOCATION_CHANGE': (state, action) => {
    const pathname = action.payload.pathname.replace(/^\/edit(\/.*)/, '$1');
    const direction = action.payload.action;
    const lastpath = state[state.length - 1];

    if (isBottomSheet(pathname)) {
      if (isSameEntity(pathname, lastpath)) {
        return [...state.slice(0, -1), pathname];
      } else {
        if (direction === 'POP') {
          if (lastpath && !isBottomSheet(lastpath)) {
            return [...state, pathname];
          } else if (state.length < 2) {
            return generatePaths(pathname);
          }
          return state.slice(0, -1);
        } else {
          if (state.length) {
            return [...state, pathname];
          }
          return generatePaths(pathname);
        }
      }
    } else {
      return [pathname];
    }
  }
}, []);
