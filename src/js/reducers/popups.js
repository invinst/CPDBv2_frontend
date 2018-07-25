import { handleActions } from 'redux-actions';

import { POPUP_REQUEST_SUCCESS } from 'utils/constants';


export default handleActions({
  [POPUP_REQUEST_SUCCESS]: (state, action) => {
    return action.payload;
  },
}, []);
