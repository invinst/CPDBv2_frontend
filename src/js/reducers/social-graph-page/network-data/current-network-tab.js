import { handleActions } from 'redux-actions';
import { isEmpty } from 'lodash';

import {
  CHANGE_NETWORK_TAB,
  NETWORK_TAB_NAMES,
  SOCIAL_GRAPH_ALLEGATIONS_REQUEST_SUCCESS,
} from 'utils/constants';


export default handleActions({
  [CHANGE_NETWORK_TAB]: (state, action) => action.payload,
  [SOCIAL_GRAPH_ALLEGATIONS_REQUEST_SUCCESS]: (state, action) => {
    if (isEmpty(action.payload)) {
      return NETWORK_TAB_NAMES.OFFICERS;
    }
    return state;
  },
}, NETWORK_TAB_NAMES.TIMELINE);
