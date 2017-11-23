import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';


export default handleActions({
  [constants.SELECT_CATEGORY]: (state, action) => action.payload,
  [constants.TOGGLE_SEARCH_TERMS]: (state, action) => null
}, null);
