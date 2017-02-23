import { handleActions } from 'redux-actions';

import { SEARCH_OFFICERS_REQUEST_SUCCESS } from 'utils/constants';


export default handleActions({
  [SEARCH_OFFICERS_REQUEST_SUCCESS]: (state, action) => action.payload
}, []);
