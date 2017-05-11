import { handleActions } from 'redux-actions';

import { OFFICER_TIMELINE_FLIP_SORT_ORDER } from 'utils/constants';


export default handleActions({
  [OFFICER_TIMELINE_FLIP_SORT_ORDER]: (state, action) => !state,
  '@@router/LOCATION_CHANGE': (state, action) => true
}, true);
