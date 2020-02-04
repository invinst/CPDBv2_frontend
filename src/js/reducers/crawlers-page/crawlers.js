import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';

import { CRAWLERS_REQUEST_SUCCESS } from 'utils/constants';
import { concat } from 'lodash';


const crawlers = handleActions({
  [LOCATION_CHANGE]: (state, action) => [],
  [CRAWLERS_REQUEST_SUCCESS]: (state, action) => concat(state, action.payload.results),
}, []);

export default crawlers;
