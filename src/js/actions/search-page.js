import { get } from 'actions/common/async-action';
import { createAction } from 'redux-actions';
import { push } from 'react-router-redux';
import { SEARCH_PATH } from 'utils/constants';


export const SUGGESTION_URL = 'suggestion/';

export const SUGGESTION_REQUEST_START = 'SUGGESTION_REQUEST_START';
export const SUGGESTION_REQUEST_SUCCESS = 'SUGGESTION_REQUEST_SUCCESS';
export const SUGGESTION_REQUEST_FAILURE = 'SUGGESTION_REQUEST_FAILURE';

export const getSuggestion = (text, params, adapter) => get(`${SUGGESTION_URL}${text}/`, [
  SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE
])(params, adapter);

export const SELECT_TAG = 'SELECT_TAG';

export const selectTag = createAction(SELECT_TAG);

export const toggleSearchMode = () => (push({
  pathname: `/${SEARCH_PATH}`
}));

export const TRACK_RECENT_SUGGESTION = 'TRACK_RECENT_SUGGESTION';

export const trackRecentSuggestion = (contentType, text, url, to) => createAction(TRACK_RECENT_SUGGESTION)({
  contentType,
  text,
  to,
  url
});
