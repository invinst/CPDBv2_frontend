import { handleActions } from 'redux-actions';

import { OFFICER_TIMELINE_FLIP_SORT_ORDER, CHANGE_OFFICER_ID } from 'utils/constants';


export default handleActions({
  [OFFICER_TIMELINE_FLIP_SORT_ORDER]: (state, action) => !state,
  [CHANGE_OFFICER_ID]: (state, action) => true
}, true);
