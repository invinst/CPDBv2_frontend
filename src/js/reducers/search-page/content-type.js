import { handleActions } from 'redux-actions';

import { SELECT_TAG, LOCATION_CHANGE, SEARCH_CATEGORIES } from 'utils/constants';


export default handleActions({
  [SELECT_TAG]: (state, action) => action.payload,
  [LOCATION_CHANGE]: (state, action) => {
    const contentType = action.payload.query.type;
    return SEARCH_CATEGORIES.includes(contentType) ? contentType : null;
  },
}, null);
