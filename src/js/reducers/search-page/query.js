import { handleActions } from 'redux-actions';

import { CHANGE_SEARCH_QUERY, LOCATION_CHANGE } from 'utils/constants';


export default handleActions({
  [CHANGE_SEARCH_QUERY]: (state, action) => action.payload,
  [LOCATION_CHANGE]: (state, action) => (action.payload.query.terms || ''),
}, '');
