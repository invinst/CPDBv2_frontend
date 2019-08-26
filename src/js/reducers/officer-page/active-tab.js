import { handleActions } from 'redux-actions';

import { getOfficerActiveTab } from 'utils/location';

export default handleActions({
  '@@router/LOCATION_CHANGE': (state, action) => {
    const currentValue = getOfficerActiveTab(action.payload.pathname);
    if (currentValue === null) {
      return state;
    }
    return currentValue;
  },
}, null);
