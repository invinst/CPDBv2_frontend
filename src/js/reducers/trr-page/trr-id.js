import { handleActions } from 'redux-actions';

import { getTRRId } from 'utils/location';

export default handleActions({
  '@@router/LOCATION_CHANGE': (state, action) => {
    const currentValue = getTRRId(action.payload.pathname);
    if (isNaN(currentValue)) {
      return state;
    }
    return currentValue;
  },
}, null);
