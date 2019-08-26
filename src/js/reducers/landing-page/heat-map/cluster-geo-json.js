import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';


export default handleActions({
  [constants.CLUSTER_GEO_REQUEST_START]: (state, action) => (state),
  [constants.CLUSTER_GEO_REQUEST_SUCCESS]: (state, action) => (action.payload),
  [constants.CLUSTER_GEO_REQUEST_FAILURE]: (state, action) => (state),
}, null);
