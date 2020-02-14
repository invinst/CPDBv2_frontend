import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';

import { getNonEditPath } from 'utils/edit-path';


export default handleActions({
  [LOCATION_CHANGE]: (state, action) => {
    const { pathname } = action.payload.location;
    return getNonEditPath(pathname).startsWith('/search/') ? state : pathname;
  },
}, '/');
