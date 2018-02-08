import { handleActions } from 'redux-actions';

import { SELECT_TAG } from 'actions/search-page';


export default handleActions({
  [SELECT_TAG]: (state, action) => (
    action.payload
  )
}, null);
