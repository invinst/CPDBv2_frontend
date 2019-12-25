import { handleActions } from 'redux-actions';

import { TOAST_REQUEST_SUCCESS } from 'utils/constants';


export default handleActions({
  [TOAST_REQUEST_SUCCESS]: (state, action) => {
    return action.payload;
  },
}, []);
