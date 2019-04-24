import { handleActions } from 'redux-actions';

import { CHANGE_SOCIAL_GRAPH_TAB, SOCIAL_GRAPH_PAGE_TAB_NAMES } from 'utils/constants';


export default handleActions({
  [CHANGE_SOCIAL_GRAPH_TAB]: (state, action) => {
    return action.payload;
  },
}, SOCIAL_GRAPH_PAGE_TAB_NAMES.OFFICERS);
