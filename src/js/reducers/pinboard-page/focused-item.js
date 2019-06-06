import { handleActions } from 'redux-actions';

import { PINBOARD_PAGE_FOCUS_ITEM } from 'utils/constants';


export default handleActions({
  [PINBOARD_PAGE_FOCUS_ITEM]: (state, action) => {
    return action.payload;
  },
}, {});
