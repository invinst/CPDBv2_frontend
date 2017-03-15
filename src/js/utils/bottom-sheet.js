import { STORIES_PATH, FAQ_PATH } from 'utils/constants';


export function isReportBottomSheetPath(path) {
  return !!path.match(new RegExp(`(\/edit)?/${STORIES_PATH}(\\d+|new)`));
}

export function isFAQBottomSheetPath(path) {
  return !!path.match(new RegExp(`(\/edit)?/${FAQ_PATH}(\\d+|new)`));
}

export function isOfficerBottomSheetPath(path) {
  return !!path.match(/^(\/edit)?\/officer\/(\d+)\/(timeline\/)?/);
}

export function isBottomSheetPath(path) {
  return isReportBottomSheetPath(path) || isFAQBottomSheetPath(path) || isOfficerBottomSheetPath(path);
}
