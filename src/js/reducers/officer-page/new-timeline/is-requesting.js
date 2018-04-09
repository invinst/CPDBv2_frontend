import { handleActions } from 'redux-actions';

import {
  OFFICER_NEW_TIMELINE_ITEMS_REQUEST_START,
  OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS,
  OFFICER_NEW_TIMELINE_ITEMS_REQUEST_FAILURE,
} from 'utils/constants';


const isRequesting = handleActions({
  [OFFICER_NEW_TIMELINE_ITEMS_REQUEST_START]: (state, action) => (true),
  [OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS]: (state, action) => (false),
  [OFFICER_NEW_TIMELINE_ITEMS_REQUEST_FAILURE]: (state, action) => (false)
}, false);

export default isRequesting;
