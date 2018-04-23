import { handleActions } from 'redux-actions';
import { remove, slice, isEqual, isEmpty } from 'lodash';

import { TRACK_RECENT_SUGGESTION } from 'utils/constants';


export default handleActions({
  [TRACK_RECENT_SUGGESTION]: (state, action) => {
    remove(state, (suggestion) => (isEqual(suggestion, action.payload)));
    remove(state, isEmpty);
    return slice([action.payload].concat(state), 0, 10);
  }
}, []);
