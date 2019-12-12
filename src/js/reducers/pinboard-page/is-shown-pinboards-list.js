import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';

export default handleActions({
  [constants.HIDE_SHOW_PINBOARDS_LIST]: (state, action) => action.payload,
}, false);
