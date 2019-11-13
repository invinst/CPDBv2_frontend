import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';

export default handleActions({
  [constants.PINBOARD_COMPLAINTS_FETCH_REQUEST_START]: (state, action) => true,
  [constants.PINBOARD_OFFICERS_FETCH_REQUEST_START]: (state, action) => true,
  [constants.PINBOARD_TRRS_FETCH_REQUEST_START]: (state, action) => true,
  [constants.LOCATION_CHANGE]: (state, action) => false,
}, false);
