import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';

export default handleActions({
  [constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_SUCCESS]: (state, action) => action.payload
}, []);
