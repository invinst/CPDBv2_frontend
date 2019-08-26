import { handleActions } from 'redux-actions';

import {
  OFFICER_COACCUSALS_REQUEST_SUCCESS,
  CHANGE_OFFICER_ID,
} from 'utils/constants';


export default handleActions({
  [OFFICER_COACCUSALS_REQUEST_SUCCESS]: (state, action) => {
    return action.payload;
  },
  [CHANGE_OFFICER_ID]: (state, action) => [],
}, []);
