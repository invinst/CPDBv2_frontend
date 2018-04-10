import { handleActions } from 'redux-actions';

import { SELECT_TAG } from 'utils/constants';


export default handleActions({
  [SELECT_TAG]: (state, action) => (
    action.payload
  )
}, null);
