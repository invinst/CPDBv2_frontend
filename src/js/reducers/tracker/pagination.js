import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';


export default handleActions({
  [constants.TRACKER_DOCUMENTS_REQUEST_SUCCESS]: (state, { payload: { next } }) => ({ next })
}, {});
