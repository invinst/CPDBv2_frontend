import { handleActions } from 'redux-actions';

import { CHANGE_OFFICER_TAB } from 'utils/constants';


export default handleActions({
  [CHANGE_OFFICER_TAB]: (state, action) => {
    return action.payload;
  },
}, 'TIMELINE');
