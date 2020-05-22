import { handleActions } from 'redux-actions';

import { CLUSTER_GEO_REQUEST_START, CLUSTER_GEO_REQUEST_SUCCESS, CLUSTER_GEO_REQUEST_FAILURE } from 'utils/constants';


export default handleActions({
  [CLUSTER_GEO_REQUEST_START]: (state, action) => (state),
  [CLUSTER_GEO_REQUEST_SUCCESS]: (state, action) => (action.payload),
  [CLUSTER_GEO_REQUEST_FAILURE]: (state, action) => (state),
}, null);
