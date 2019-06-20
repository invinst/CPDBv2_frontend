import { handleActions } from 'redux-actions';

import { UPDATE_SOCIAL_GRAPH_REFRESH_INTERVAL_ID } from 'utils/constants';


const refreshIntervalId = handleActions({
  [UPDATE_SOCIAL_GRAPH_REFRESH_INTERVAL_ID]: (state, action) => action.payload
}, null);

export default refreshIntervalId;
