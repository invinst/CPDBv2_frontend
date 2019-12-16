import { handleActions } from 'redux-actions';

import { PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS } from 'utils/constants';

export default handleActions({
  [PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS]: (state, action) => action.payload,
}, {});
