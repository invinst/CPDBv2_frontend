import { handleActions } from 'redux-actions';
import { isEmpty } from 'lodash';

import { SOCIAL_GRAPH_ALLEGATIONS_REQUEST_SUCCESS } from 'utils/constants';


export default handleActions({
  [SOCIAL_GRAPH_ALLEGATIONS_REQUEST_SUCCESS]: (state, action) => !isEmpty(action.payload)
}, true);
