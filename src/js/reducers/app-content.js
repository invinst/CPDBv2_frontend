import { handleActions } from 'redux-actions';
import { STORIES_PATH, FAQ_PATH } from 'utils/constants';
import {
  isReportBottomSheetPath, isFAQBottomSheetPath
} from 'utils/bottom-sheet';


export default handleActions({
  '@@router/LOCATION_CHANGE': (state, action) => {
    if (isReportBottomSheetPath(action.payload.pathname)) {
      return state ? state : `/${STORIES_PATH}`;
    }
    if (isFAQBottomSheetPath(action.payload.pathname)) {
      return state ? state : `/${FAQ_PATH}`;
    }
    return action.payload.pathname;
  }
}, null);
