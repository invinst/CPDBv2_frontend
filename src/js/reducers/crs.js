import { handleActions } from 'redux-actions';

import { CR_REQUEST_SUCCESS } from 'utils/constants';


export default handleActions({
  [CR_REQUEST_SUCCESS]: (state, action) => (
    { ...state, [action.payload.crid]: action.payload }
  ),
}, {});
