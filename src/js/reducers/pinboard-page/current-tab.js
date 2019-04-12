import { handleActions } from 'redux-actions';
import { isEmpty } from 'lodash';

import {
  CHANGE_PINBOARD_TAB,
  PINBOARD_PAGE_TAB_NAMES,
  PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS
} from 'utils/constants';


export default handleActions({
  [CHANGE_PINBOARD_TAB]: (state, action) => {
    return action.payload;
  },
  [PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS]: (state, action) => {
    if (isEmpty(action.payload['coaccused_data'])) {
      return PINBOARD_PAGE_TAB_NAMES.GEOGRAPHIC;
    } else {
      return state;
    }
  }
}, PINBOARD_PAGE_TAB_NAMES.NETWORK);
