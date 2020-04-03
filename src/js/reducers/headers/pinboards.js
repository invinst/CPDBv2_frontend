import { handleActions } from 'redux-actions';

import { HEADER_PINBOARDS_REQUEST_SUCCESS } from 'utils/constants';

export default handleActions({
  [HEADER_PINBOARDS_REQUEST_SUCCESS]: (state, action) => action.payload,
}, []);
