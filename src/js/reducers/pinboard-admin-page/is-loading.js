import { handleActions } from 'redux-actions';

import {
  ALL_PINBOARD_REQUEST_START,
  ALL_PINBOARD_REQUEST_SUCCESS,
  ALL_PINBOARD_REQUEST_FAILURE,
} from 'utils/constants';


export default handleActions({
  [ALL_PINBOARD_REQUEST_START]: (state, action) => true,
  [ALL_PINBOARD_REQUEST_SUCCESS]: (state, action) => false,
  [ALL_PINBOARD_REQUEST_FAILURE]: (state, action) => false,
}, false);
