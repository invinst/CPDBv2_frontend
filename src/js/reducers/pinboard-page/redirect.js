import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';

export default handleActions({
  [constants.PINBOARD_PAGE_REDIRECT]: (state, action) => action.payload,
}, false);
