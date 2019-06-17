import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';

export default handleActions({
  [constants.PINBOARD_FETCH_REQUEST_START]: (state, action) => false,
  [constants.PINBOARD_FETCH_REQUEST_SUCCESS]: (state, action) => true,
  [constants.PINBOARD_FETCH_REQUEST_FAILURE]: (state, action) => true,
}, false);
