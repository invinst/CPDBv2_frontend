import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';


export default handleActions({
  [constants.SEARCH_TERMS_CATEGORIES_REQUEST_START]: (state, action) => (state),
  [constants.SEARCH_TERMS_CATEGORIES_REQUEST_SUCCESS]: (state, action) => action.payload,
  [constants.SEARCH_TERMS_CATEGORIES_REQUEST_FAILURE]: (state, action) => (state)
}, []);
