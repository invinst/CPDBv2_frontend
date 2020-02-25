import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';

import { getComplaintOfficerId } from 'utils/location';

export default handleActions({
  [LOCATION_CHANGE]: (state, action) => {
    const currentValue = getComplaintOfficerId(action.payload.location.pathname);
    if (isNaN(currentValue)) {
      return state;
    }
    return currentValue;
  },
}, null);
