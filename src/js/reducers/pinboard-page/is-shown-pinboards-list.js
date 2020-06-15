import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';

import { HIDE_SHOW_PINBOARDS_LIST } from 'utils/constants';


export default handleActions({
  [HIDE_SHOW_PINBOARDS_LIST]: (state, action) => action.payload,
  [LOCATION_CHANGE]: (state, action) => false,
}, false);
