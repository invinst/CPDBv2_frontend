import { handleActions } from 'redux-actions';

import { CHANGE_SOCIAL_GRAPH_MAIN_TAB, SOCIAL_GRAPH_MAIN_TAB_NAMES } from 'utils/constants';


export default handleActions({
  [CHANGE_SOCIAL_GRAPH_MAIN_TAB]: (state, action) => {
    return action.payload;
  },
}, SOCIAL_GRAPH_MAIN_TAB_NAMES.NETWORK);
