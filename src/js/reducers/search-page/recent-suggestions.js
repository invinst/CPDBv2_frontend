import { handleActions } from 'redux-actions';
import { remove, slice, isEqual } from 'lodash';

import { TRACK_RECENT_SUGGESTION } from 'actions/search-page';


export default handleActions({
  [TRACK_RECENT_SUGGESTION]: (state, action) => {
    remove(state, (suggestion) => (isEqual(suggestion, action.payload)));
    return slice([action.payload].concat(state), 0, 10);
  }
}, []);
