import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';

export default handleActions({
  [constants.FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS]: (state, action) => action.payload['count'],
}, null);
