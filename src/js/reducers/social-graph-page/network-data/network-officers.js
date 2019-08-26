import { handleActions } from 'redux-actions';

import { SOCIAL_GRAPH_OFFICERS_REQUEST_SUCCESS } from 'utils/constants';


const networkOfficers = handleActions({
  [SOCIAL_GRAPH_OFFICERS_REQUEST_SUCCESS]: (state, action) => action.payload,
}, []);

export default networkOfficers;
