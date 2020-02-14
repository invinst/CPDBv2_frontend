import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';

import { getCRID } from 'utils/location';

export default handleActions({
  [LOCATION_CHANGE]: (state, action) => {
    const currentValue = getCRID(action.payload.location.pathname);
    if (currentValue == null) {
      return state;
    }
    return currentValue;
  },
}, null);
