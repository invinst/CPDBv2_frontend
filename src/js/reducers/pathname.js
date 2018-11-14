import { handleActions } from 'redux-actions';
import { UPDATE_PATH_NAME } from 'utils/constants';

export default handleActions({
  '@@router/LOCATION_CHANGE': (state, action) => action.payload.pathname,
  [UPDATE_PATH_NAME]: (state, action) => action.payload
}, null);
