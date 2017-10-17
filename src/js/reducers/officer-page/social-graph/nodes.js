import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';


export default handleActions({
  [constants.OFFICER_SOCIAL_GRAPH_REQUEST_SUCCESS]: (state, action) => action.payload['nodes']
}, []);
