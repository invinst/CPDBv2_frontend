import { handleActions } from 'redux-actions';

import { SELECT_TAG, LOCATION_CHANGE } from 'utils/constants';


export default handleActions({
  [SELECT_TAG]: (state, action) => (
    action.payload
  ),
  [LOCATION_CHANGE]: (state, action) => (action.payload.query.type || '')
}, null);
