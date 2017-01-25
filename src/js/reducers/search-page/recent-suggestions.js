import { handleActions } from 'redux-actions';
import { remove, slice, isEqual } from 'lodash';

import { SUGGESTION_CLICK } from 'actions/search-page';


export default handleActions({
  [SUGGESTION_CLICK]: (state, action) => {
    remove(state, (suggestion) => (isEqual(suggestion, action.payload)));
    return slice([action.payload].concat(state), 0, 10);
  }
}, []);
