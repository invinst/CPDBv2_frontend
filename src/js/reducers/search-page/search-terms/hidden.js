import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';


export default handleActions({
  [constants.TOGGLE_SEARCH_TERMS]: (state, action) => (!state),
}, true);
