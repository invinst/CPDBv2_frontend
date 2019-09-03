import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';


const isRequesting = handleActions({
  [constants.ACTIVITY_GRID_REQUEST_START]: (state, action) => (true),
  [constants.ACTIVITY_GRID_REQUEST_SUCCESS]: (state, action) => (false),
  [constants.ACTIVITY_GRID_REQUEST_FAILURE]: (state, action) => (false),
}, false);

export default isRequesting;
