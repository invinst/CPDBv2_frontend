import {
  OFFICER_NEW_TIMELINE_ITEMS_CHANGE_FILTER,
  NEW_TIMELINE_FILTERS,
  CHANGE_OFFICER_ID,
} from 'utils/constants';
import { handleActions } from 'redux-actions';


export default handleActions({
  [OFFICER_NEW_TIMELINE_ITEMS_CHANGE_FILTER]: (state, action) => action.payload,
  [CHANGE_OFFICER_ID]: (state, action) => NEW_TIMELINE_FILTERS.ALL,
}, NEW_TIMELINE_FILTERS.ALL);
