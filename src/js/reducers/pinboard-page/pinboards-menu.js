import { handleActions } from 'redux-actions';

import { PINBOARDS_MENU_REQUEST_SUCCESS } from 'utils/constants';

export default handleActions({
  [PINBOARDS_MENU_REQUEST_SUCCESS]: (state, action) => action.payload,
}, []);
