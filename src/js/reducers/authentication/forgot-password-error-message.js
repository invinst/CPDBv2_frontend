import { handleActions } from 'redux-actions';

import { RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST } from 'utils/constants';


export default handleActions({
  [RESET_PASSWORD_FAILURE]: (state, action) => action.payload.message,
  [RESET_PASSWORD_SUCCESS]: (state, action) => null,
  [RESET_PASSWORD_REQUEST]: (state, action) => null,
}, null);
