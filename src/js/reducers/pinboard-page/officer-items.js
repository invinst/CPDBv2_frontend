import { handleActions } from 'redux-actions';

import { PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS } from 'utils/constants';

export default handleActions({
  [PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS]: (state, action) => action.payload,
}, []);
