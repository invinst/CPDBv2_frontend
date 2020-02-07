import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';
import { get, concat, slice } from 'lodash';

import { UPDATE_PATH_NAME } from 'utils/constants';


export default handleActions({
  [LOCATION_CHANGE]: (state, action) => {
    let pathname = get(action.payload, 'location.pathname');

    if (pathname) {
      pathname = pathname.replace('/edit/', '/');
      if (pathname === '/') {
        return [];
      }

      const itemIndex = state.indexOf(pathname);
      if (itemIndex >= 0) {
        return slice(state, 0, itemIndex + 1);
      }
      return concat(state, pathname);
    }
    return state;
  },
  [UPDATE_PATH_NAME]: (state, action) => {
    const pathname = action.payload;
    return concat(slice(state, 0, state.length - 1), pathname);
  },
}, []);
