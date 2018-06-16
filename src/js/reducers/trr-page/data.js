import { handleActions } from 'redux-actions';

import { TRR_REQUEST_SUCCESS } from 'utils/constants';


export default handleActions({
  [TRR_REQUEST_SUCCESS]: (state, action) => (
    action.payload
  ),
}, {});
