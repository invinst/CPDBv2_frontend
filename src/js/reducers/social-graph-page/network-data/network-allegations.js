import { handleActions } from 'redux-actions';

import { SOCIAL_GRAPH_ALLEGATIONS_REQUEST_SUCCESS } from 'utils/constants';


const networkAllegations = handleActions({
  [SOCIAL_GRAPH_ALLEGATIONS_REQUEST_SUCCESS]: (state, action) => action.payload,
}, []);

export default networkAllegations;
