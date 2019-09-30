import { handleActions } from 'redux-actions';

import { CHANGE_SEARCH_QUERY, LOCATION_CHANGE, SEARCH_QUERY_PREFIX_REGEX } from 'utils/constants';


const getSearchQuery = (searchText) => {
  return searchText ? searchText.replace(SEARCH_QUERY_PREFIX_REGEX, '') : searchText;
};

export default handleActions({
  [CHANGE_SEARCH_QUERY]: (state, action) => getSearchQuery(action.payload),
  [LOCATION_CHANGE]: (state, action) => (getSearchQuery(action.payload.query.terms) || ''),
}, '');
