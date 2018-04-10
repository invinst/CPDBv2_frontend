import { handleActions } from 'redux-actions';

import { LOCATION_CHANGE } from 'utils/constants';

import { SELECT_TAG } from 'actions/search-page';


export default handleActions({
  [SELECT_TAG]: (state, action) => (
    action.payload
  ),
  [LOCATION_CHANGE]: (state, action) => (action.payload.query.type || '')
}, null);
