import { handleActions } from 'redux-actions';
import { invert, isNull } from 'lodash';
import { LOCATION_CHANGE } from 'connected-react-router';
import queryString from 'query-string';

import {
  SELECT_TAG,
  SEARCH_CATEGORIES,
  CHANGE_SEARCH_QUERY,
  SEARCH_QUERY_PREFIX_REGEX,
  SEARCH_CATEGORY_PREFIXES,
} from 'utils/constants';


const SEARCH_CATEGORY_PREFIXES_INVERT = invert(SEARCH_CATEGORY_PREFIXES);

const getContentType = (query) => {
  const matchResult = (query || '').match(SEARCH_QUERY_PREFIX_REGEX);
  return matchResult ? SEARCH_CATEGORY_PREFIXES_INVERT[matchResult[1]] : null;
};

export default handleActions({
  [SELECT_TAG]: (state, action) => action.payload,
  [CHANGE_SEARCH_QUERY]: (state, action) => getContentType(action.payload),
  [LOCATION_CHANGE]: (state, action) => {
    const query = queryString.parse(action.payload.location.search);
    let contentType = getContentType(query.terms);
    if (isNull(contentType)) {
      contentType = query.type;
      contentType = SEARCH_CATEGORIES.includes(contentType) ? contentType : null;
    }
    return contentType;
  },
}, null);
