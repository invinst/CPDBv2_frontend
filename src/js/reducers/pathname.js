import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';

import { UPDATE_PATH_NAME } from 'utils/constants';

export default handleActions({
  [LOCATION_CHANGE]: (state, action) => action.payload.location.pathname,
  [UPDATE_PATH_NAME]: (state, action) => action.payload,
}, null);
