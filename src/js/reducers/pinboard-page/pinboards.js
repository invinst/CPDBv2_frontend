import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';

export default handleActions({
  [constants.PINBOARDS_FETCH_REQUEST_SUCCESS]: (state, action) => action.payload,
}, []);
