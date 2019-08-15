import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';

export default handleActions({
  [constants.PINBOARD_GEOGRAPHIC_FETCH_REQUEST_START]: (state, action) => true,
  [constants.FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS]: (state, action) => false,
  [constants.FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS]: (state, action) => false,
}, false);
