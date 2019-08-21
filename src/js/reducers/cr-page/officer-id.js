import { handleActions } from 'redux-actions';

import { getComplaintOfficerId } from 'utils/location';

export default handleActions({
  '@@router/LOCATION_CHANGE': (state, action) => {
    const currentValue = getComplaintOfficerId(action.payload.pathname);
    if (isNaN(currentValue)) {
      return state;
    }
    return currentValue;
  },
}, null);
