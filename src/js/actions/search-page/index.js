import { get } from 'actions/common/async-action';
import { createAction } from 'redux-actions';
import { OPEN_SEARCH_PAGE } from 'utils/constants';


export const SUGGESTION_URL = 'suggestion/';

export const SUGGESTION_REQUEST_START = 'SUGGESTION_REQUEST_START';
export const SUGGESTION_REQUEST_SUCCESS = 'SUGGESTION_REQUEST_SUCCESS';
export const SUGGESTION_REQUEST_FAILURE = 'SUGGESTION_REQUEST_FAILURE';

export const getSuggestion = (text, params, adapter) => get(`${SUGGESTION_URL}${text}/`, [
  SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE
])(params, adapter);

export const SELECT_TAG = 'SELECT_TAG';

export const selectTag = createAction(SELECT_TAG);

export const toggleSearchMode = createAction(OPEN_SEARCH_PAGE);

export const CHANGE_SEARCH_QUERY = 'CHANGE_SEARCH_QUERY';
export const changeSearchQuery = createAction(CHANGE_SEARCH_QUERY);

export const TRACK_RECENT_SUGGESTION = 'TRACK_RECENT_SUGGESTION';
export const SEARCH_NAVIGATION_LEFT = 'SEARCH_NAVIGATION_LEFT';
export const SEARCH_NAVIGATION_RIGHT = 'SEARCH_NAVIGATION_RIGHT';
export const SEARCH_NAVIGATION_UP = 'SEARCH_NAVIGATION_UP';
export const SEARCH_NAVIGATION_DOWN = 'SEARCH_NAVIGATION_DOWN';

export const move = (direction, suggestionColumns) => {
  const DIRECTON_TO_ACTION = {
    'up': SEARCH_NAVIGATION_UP,
    'down': SEARCH_NAVIGATION_DOWN,
    'right': SEARCH_NAVIGATION_RIGHT,
    'left': SEARCH_NAVIGATION_LEFT
  };

  return createAction(DIRECTON_TO_ACTION[direction])({ suggestionColumns });
};

export const trackRecentSuggestion = (contentType, text, url, to) => createAction(TRACK_RECENT_SUGGESTION)({
  contentType,
  text,
  to,
  url
});

export const SEARCH_NAVIGATION_RESET = 'SEARCH_NAVIGATION_RESET';
export const resetNavigation = createAction(SEARCH_NAVIGATION_RESET);
