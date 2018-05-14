import { handleActions } from 'redux-actions';
import { STORIES_PATH } from 'utils/constants';
import { isReportBottomSheetPath } from 'utils/bottom-sheet';


export default handleActions({
  '@@router/LOCATION_CHANGE': (state, action) => {
    if (isReportBottomSheetPath(action.payload.pathname)) {
      return state ? state : `/${STORIES_PATH}`;
    }
    return action.payload.pathname;
  }
}, null);
