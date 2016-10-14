import { handleActions } from 'redux-actions';

import { SIGNIN_REQUEST_SUCCESS } from 'actions/authentication';


export default handleActions({
  [SIGNIN_REQUEST_SUCCESS]: (state, action) => action.payload.apiAccessToken
}, null);
