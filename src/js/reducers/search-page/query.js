import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';
import queryString from 'query-string';

import { CHANGE_SEARCH_QUERY, SEARCH_QUERY_PREFIX_REGEX } from 'utils/constants';


const getSearchQuery = (searchText) => {
  return searchText ? searchText.replace(SEARCH_QUERY_PREFIX_REGEX, '') : searchText;
};

export default handleActions({
  [CHANGE_SEARCH_QUERY]: (state, action) => getSearchQuery(action.payload),
  [LOCATION_CHANGE]: (state, action) => (getSearchQuery(queryString.parse(action.payload.location.search).terms) || ''),
}, '');
