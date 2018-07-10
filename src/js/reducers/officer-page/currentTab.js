import { handleActions } from 'redux-actions';

import { CHANGE_OFFICER_TAB, OFFICER_PAGE_TAB_NAMES, CHANGE_OFFICER_ID } from 'utils/constants';


export default handleActions({
  [CHANGE_OFFICER_TAB]: (state, action) => {
    return action.payload;
  },
  [CHANGE_OFFICER_ID]: (state, action) => {
    return OFFICER_PAGE_TAB_NAMES.TIMELINE;
  },
}, OFFICER_PAGE_TAB_NAMES.TIMELINE);
