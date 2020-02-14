import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';

import { OPEN_FORGOT_PASSWORD_MODAL, CLOSE_FORGOT_PASSWORD_MODAL, RESET_PASSWORD_SUCCESS } from 'utils/constants';


export default handleActions({
  [OPEN_FORGOT_PASSWORD_MODAL]: (state, action) => true,
  [CLOSE_FORGOT_PASSWORD_MODAL]: (state, action) => false,
  [RESET_PASSWORD_SUCCESS]: (state, action) => false,
  [LOCATION_CHANGE]: (state, action) => false,
}, false);
