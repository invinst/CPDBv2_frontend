import { handleActions } from 'redux-actions';

import {
  OFFICER_SUMMARY_REQUEST_SUCCESS,
  CHANGE_OFFICER_ID
} from 'utils/constants';


export default handleActions({
  [OFFICER_SUMMARY_REQUEST_SUCCESS]: (state, { payload }) => payload.id,
  [CHANGE_OFFICER_ID]: (state, action) => action.payload || state
}, null);
