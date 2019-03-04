import { handleActions } from 'redux-actions';

import { CRAWLERS_REQUEST_SUCCESS } from 'utils/constants';
import { concat } from 'lodash';


const crawlers = handleActions({
  [CRAWLERS_REQUEST_SUCCESS]: (state, action) => concat(state, action.payload.results)
}, []);

export default crawlers;
