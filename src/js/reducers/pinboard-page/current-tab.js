import { handleActions } from 'redux-actions';

import { CHANGE_PINBOARD_TAB, PINBOARD_PAGE_TAB_NAMES } from 'utils/constants';


export default handleActions({
  [CHANGE_PINBOARD_TAB]: (state, action) => {
    return action.payload;
  },
}, PINBOARD_PAGE_TAB_NAMES.NETWORK);
