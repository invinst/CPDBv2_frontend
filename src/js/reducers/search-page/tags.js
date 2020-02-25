import { handleActions } from 'redux-actions';
import { keys, isEmpty, omitBy } from 'lodash';
import { LOCATION_CHANGE } from 'connected-react-router';
import queryString from 'query-string';

import {
  SUGGESTION_REQUEST_SUCCESS,
  SUGGESTION_REQUEST_START,
  SEARCH_CATEGORIES,
} from 'utils/constants';


export default handleActions({
  [SUGGESTION_REQUEST_START]: () => [],
  [SUGGESTION_REQUEST_SUCCESS]: (state, action) => keys(omitBy(action.payload, isEmpty)),
  [LOCATION_CHANGE]: (state, action) => {
    const contentType = queryString.parse(action.payload.location.search).type;
    return SEARCH_CATEGORIES.includes(contentType) ? [contentType] : state;
  },
}, []);
