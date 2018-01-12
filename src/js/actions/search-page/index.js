import { get } from 'actions/common/async-action';
import { createAction } from 'redux-actions';
import * as constants from 'utils/constants';
import { CancelToken } from 'axios';


let source;

const cancelOldRequest = (newRequest) => (...args) => {
  if (source) {
    source.cancel('Cancelled by user');
  }
  source = CancelToken.source();
  return newRequest(...args);
};

export const SUGGESTION_URL = 'suggestion/';

export const SUGGESTION_REQUEST_START = 'SUGGESTION_REQUEST_START';
export const SUGGESTION_REQUEST_SUCCESS = 'SUGGESTION_REQUEST_SUCCESS';
export const SUGGESTION_REQUEST_FAILURE = 'SUGGESTION_REQUEST_FAILURE';

export const getSuggestion = cancelOldRequest(
  (text, params, adapter) => get(
    `${SUGGESTION_URL}${text}/`,
    [
      SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE
    ],
    source.token
  )(params, adapter)
);

export const getSuggestionWithContentType = cancelOldRequest(
  (text, params, adapter) => get(
    `${SUGGESTION_URL}${text}/single/`,
    [
      constants.SUGGESTION_SINGLE_REQUEST_START,
      constants.SUGGESTION_SINGLE_REQUEST_SUCCESS,
      constants.SUGGESTION_SINGLE_REQUEST_FAILURE
    ],
    source.token
  )(params, adapter)
);

export const SELECT_TAG = 'SELECT_TAG';

export const selectTag = createAction(SELECT_TAG);

export const toggleSearchMode = createAction(constants.OPEN_SEARCH_PAGE);

export const CHANGE_SEARCH_QUERY = 'CHANGE_SEARCH_QUERY';
export const changeSearchQuery = createAction(CHANGE_SEARCH_QUERY);

export const TRACK_RECENT_SUGGESTION = 'TRACK_RECENT_SUGGESTION';
export const SEARCH_NAVIGATION_UP = 'SEARCH_NAVIGATION_UP';
export const SEARCH_NAVIGATION_DOWN = 'SEARCH_NAVIGATION_DOWN';

export const move = (direction, totalItemCount) => {
  const DIRECTON_TO_ACTION = {
    'up': SEARCH_NAVIGATION_UP,
    'down': SEARCH_NAVIGATION_DOWN
  };

  return createAction(DIRECTON_TO_ACTION[direction])({ totalItemCount });
};

export const trackRecentSuggestion = (contentType, text, url, to) => createAction(TRACK_RECENT_SUGGESTION)({
  contentType,
  text,
  to,
  url
});

export const SEARCH_NAVIGATION_RESET = 'SEARCH_NAVIGATION_RESET';
export const resetNavigation = createAction(SEARCH_NAVIGATION_RESET);
