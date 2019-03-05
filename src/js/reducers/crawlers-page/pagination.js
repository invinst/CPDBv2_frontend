import { handleActions } from 'redux-actions';

import { CRAWLERS_REQUEST_SUCCESS } from 'utils/constants';


export default handleActions({
  [CRAWLERS_REQUEST_SUCCESS]: (state, { payload: { next } }) => ({ next })
}, {});
