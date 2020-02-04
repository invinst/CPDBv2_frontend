import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';

import { FIRST_PAGE_GEOGRAPHIC_CRS_REQUEST_SUCCESS } from 'utils/constants';

export default handleActions({
  [FIRST_PAGE_GEOGRAPHIC_CRS_REQUEST_SUCCESS]: (state, action) => true,
  [LOCATION_CHANGE]: (state, action) => false,
}, false);
