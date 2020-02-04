import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';

import { getTRRId } from 'utils/location';

export default handleActions({
  [LOCATION_CHANGE]: (state, action) => {
    const currentValue = getTRRId(action.payload.location.pathname);
    if (isNaN(currentValue)) {
      return state;
    }
    return currentValue;
  },
}, null);
