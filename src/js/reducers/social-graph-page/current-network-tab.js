import { handleActions } from 'redux-actions';

import { CHANGE_NETWORK_TAB, NETWORK_TAB_NAMES } from 'utils/constants';


export default handleActions({
  [CHANGE_NETWORK_TAB]: (state, action) => {
    return action.payload;
  },
}, NETWORK_TAB_NAMES.OFFICERS);
