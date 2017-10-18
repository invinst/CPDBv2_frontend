import { handleActions } from 'redux-actions';

import { getCRID } from 'utils/location';

export default handleActions({
  '@@router/LOCATION_CHANGE': (state, action) => {
    const currentValue = getCRID(action.payload.pathname);
    if (isNaN(currentValue)) {
      return state;
    }
    return currentValue;
  }
}, null);
