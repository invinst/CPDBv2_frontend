import { handleActions } from 'redux-actions';

import {
  OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS,
  OFFICER_TIMELINE_FIRST_ITEMS_REQUEST_SUCCESS,
  CHANGE_OFFICER_ID,
} from 'utils/constants';


export default handleActions({
  [OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS]: (state, action) => {
    return [...state, ...action.payload.results];
  },
  [OFFICER_TIMELINE_FIRST_ITEMS_REQUEST_SUCCESS]: (state, action) => (action.payload.results),
  [CHANGE_OFFICER_ID]: (state, action) => []
}, []);
