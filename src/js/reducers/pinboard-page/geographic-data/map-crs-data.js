import { handleActions } from 'redux-actions';
import { concat } from 'lodash';

import * as constants from 'utils/constants';

export default handleActions({
  [constants.PINBOARD_GEOGRAPHIC_FETCH_REQUEST_START]: (state, action) => [],
  [constants.FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS]: (state, action) => action.payload['results'],
  [constants.PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS]: (state, action) => concat(
    state, action.payload['results']
  ),
}, []);
