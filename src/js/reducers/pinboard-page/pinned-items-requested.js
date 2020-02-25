import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';

import {
  PINBOARD_COMPLAINTS_FETCH_REQUEST_START,
  PINBOARD_OFFICERS_FETCH_REQUEST_START,
  PINBOARD_TRRS_FETCH_REQUEST_START,
} from 'utils/constants';

export default handleActions({
  [PINBOARD_COMPLAINTS_FETCH_REQUEST_START]: (state, action) => true,
  [PINBOARD_OFFICERS_FETCH_REQUEST_START]: (state, action) => true,
  [PINBOARD_TRRS_FETCH_REQUEST_START]: (state, action) => true,
  [LOCATION_CHANGE]: (state, action) => false,
}, false);
