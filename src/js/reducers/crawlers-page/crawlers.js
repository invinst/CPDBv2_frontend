import { handleActions } from 'redux-actions';

import { CRAWLERS_REQUEST_SUCCESS } from 'utils/constants';
import { concat, isEmpty } from 'lodash';


const crawlers = handleActions({
  [CRAWLERS_REQUEST_SUCCESS]: (state, action) => {
    return isEmpty(state) ? action.payload.results : concat(state, action.payload.results);
  }
}, []);



export default crawlers;
