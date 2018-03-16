import { handleActions } from 'redux-actions';

import { OFFICER_METRICS_REQUEST_SUCCESS, CHANGE_OFFICER_ID } from 'utils/constants';


export default handleActions({
  [OFFICER_METRICS_REQUEST_SUCCESS]: (state, action) => (
    { ...state, ...action.payload }
  ),
  [CHANGE_OFFICER_ID]: () => ({})
}, {});
