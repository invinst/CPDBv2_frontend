import { handleActions } from 'redux-actions';

import { CLUSTER_GEO_REQUEST_START, CLUSTER_GEO_REQUEST_SUCCESS, CLUSTER_GEO_REQUEST_FAILURE } from 'utils/constants';


export default handleActions({
  [CLUSTER_GEO_REQUEST_START]: (state, action) => false,
  [CLUSTER_GEO_REQUEST_SUCCESS]: (state, action) => true,
  [CLUSTER_GEO_REQUEST_FAILURE]: (state, action) => true,
}, false);
