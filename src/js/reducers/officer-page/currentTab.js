import { handleActions } from 'redux-actions';

import { CHANGE_OFFICER_TAB, OFFICER_PAGE_TAB_NAMES } from 'utils/constants';


export default handleActions({
  [CHANGE_OFFICER_TAB]: (state, action) => {
    return action.payload;
  },
}, OFFICER_PAGE_TAB_NAMES.TIMELINE);
