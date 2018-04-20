import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';


const count = handleActions({
  [constants.RELATED_COMPLAINTS_BY_CATEGORY_REQUEST_SUCCESS]: (state, action) => (action.payload.count)
}, 0);

export default count;
