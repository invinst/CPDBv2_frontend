import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';
import { get, slice, findIndex } from 'lodash';

import { UPDATE_PATH_NAME } from 'utils/constants';
import { getPathNameKey } from 'utils/paths';
import { getNonEditPath } from 'utils/edit-path';


export default handleActions({
  [LOCATION_CHANGE]: (state, action) => {
    let pathname = get(action.payload, 'location.pathname');

    if (pathname) {
      pathname = getNonEditPath(pathname);
      if (pathname === '/') {
        return [];
      }

      const pathNameKey = getPathNameKey(pathname);
      const itemIndex = findIndex(state, item => item.includes(pathNameKey));
      if (itemIndex >= 0) {
        return [...slice(state, 0, itemIndex), pathname];
      }
      return [...state, pathname];
    }
    return state;
  },
  [UPDATE_PATH_NAME]: (state, action) => {
    const pathname = action.payload;
    return [...slice(state, 0, state.length - 1), pathname];
  },
}, []);
