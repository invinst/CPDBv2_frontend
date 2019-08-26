import { handleActions } from 'redux-actions';

import { UNIT_PROFILE_SUMMARY_REQUEST_SUCCESS } from 'utils/constants';


export default handleActions({
  [UNIT_PROFILE_SUMMARY_REQUEST_SUCCESS]: (state, action) => (
    { ...state, ...action.payload }
  ),
}, {});
