import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';

import { getOfficerActiveTab } from 'utils/location';

export default handleActions({
  [LOCATION_CHANGE]: (state, action) => {
    const currentValue = getOfficerActiveTab(action.payload.location.pathname);
    if (currentValue === null) {
      return state;
    }
    return currentValue;
  },
}, null);
