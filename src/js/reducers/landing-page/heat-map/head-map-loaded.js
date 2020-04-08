import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';

import { HEAT_MAP_LOADED } from 'utils/constants';


export default handleActions({
  [HEAT_MAP_LOADED]: (state, action) => true,
  [LOCATION_CHANGE]: (state, action) => false,
}, false);
