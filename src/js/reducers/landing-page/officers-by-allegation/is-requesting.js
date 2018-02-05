import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';


const isRequesting = handleActions({
  [constants.OFFICERS_BY_ALLEGATION_REQUEST_START]: (state, action) => (true),
  [constants.OFFICERS_BY_ALLEGATION_REQUEST_SUCCESS]: (state, action) => (false),
  [constants.OFFICERS_BY_ALLEGATION_REQUEST_FAILURE]: (state, action) => (false)
}, false);

export default isRequesting;
