import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';

export default handleActions({
  [LOCATION_CHANGE]: (state, action) => {
    const { pathname } = action.payload.location;
    return pathname.startsWith('/search/') ? state : pathname;
  },
}, '/');
