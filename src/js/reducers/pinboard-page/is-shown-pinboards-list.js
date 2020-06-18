import { handleActions } from 'redux-actions';

import { HIDE_SHOW_PINBOARDS_LIST } from 'utils/constants';


export default handleActions({
  [HIDE_SHOW_PINBOARDS_LIST]: (state, action) => action.payload,
}, false);
