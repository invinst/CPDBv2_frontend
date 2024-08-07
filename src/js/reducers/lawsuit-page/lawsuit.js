import { handleActions } from 'redux-actions';

import { LAWSUIT_FETCH_SUCCESS } from 'utils/constants';


export default handleActions({
  [LAWSUIT_FETCH_SUCCESS]: (state, action) => (action.payload),
}, {});
