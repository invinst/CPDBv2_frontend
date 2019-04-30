import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';

export default handleActions({
  [constants.GEOGRAPHIC_REQUEST_SUCCESS]: (state, action) => action.payload
}, []);
