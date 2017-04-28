import { handleActions } from 'redux-actions';

import { OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS, OFFICER_TIMELINE_FLIP_SORT_ORDER } from 'utils/constants';


export default handleActions({
  [OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS]: (state, action) => {
    return [...state, ...action.payload.results];
  },
  [OFFICER_TIMELINE_FLIP_SORT_ORDER]: (state, action) => [],
  '@@router/LOCATION_CHANGE': (state, action) => []
}, []);
