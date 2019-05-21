import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';


export default handleActions({
  [constants.SHOW_TOAST]: (state, action) => ({
    ...action.payload,
  }),
}, {});
