import { handleActions } from 'redux-actions';

import { OFFICER_SUMMARY_REQUEST_SUCCESS } from 'utils/constants';


export default handleActions({
  [OFFICER_SUMMARY_REQUEST_SUCCESS]: (state, action) => action.payload['complaint_records']['sustained_count']
}, 0);
