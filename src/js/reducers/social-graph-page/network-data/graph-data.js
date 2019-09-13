import { handleActions } from 'redux-actions';

import { SOCIAL_GRAPH_NETWORK_REQUEST_SUCCESS } from 'utils/constants';


const graphData = handleActions({
  [SOCIAL_GRAPH_NETWORK_REQUEST_SUCCESS]: (state, action) => action.payload,
}, {});

export default graphData;
