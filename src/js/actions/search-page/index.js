import { get } from 'actions/common/async-action';
import { createAction } from 'redux-actions';
import { CancelToken } from 'axios';

import * as constants from 'utils/constants';
import { moveFunction } from 'actions/search-page/base';


let source;

const cancelOldRequest = (newRequest) => (...args) => {
  if (source) {
    source.cancel(constants.SUGGESTION_REQUEST_CANCEL_MESSAGE);
  }
  source = CancelToken.source();
  return newRequest(...args);
};

export const SUGGESTION_URL = 'suggestion/';

export const getSuggestion = cancelOldRequest(
  (term, params, adapter) => get(
    SUGGESTION_URL,
    [
      constants.SUGGESTION_REQUEST_START,
      constants.SUGGESTION_REQUEST_SUCCESS,
      constants.SUGGESTION_REQUEST_FAILURE
    ],
    source.token
  )({ term, ...params }, adapter)
);

export const getSuggestionWithContentType = cancelOldRequest(
  (term, params, adapter) => get(
    `${SUGGESTION_URL}single/`,
    [
      constants.SUGGESTION_SINGLE_REQUEST_START,
      constants.SUGGESTION_SINGLE_REQUEST_SUCCESS,
      constants.SUGGESTION_SINGLE_REQUEST_FAILURE
    ],
    source.token
  )({ term, ...params }, adapter)
);


export const selectTag = createAction(constants.SELECT_TAG);

export const toggleSearchMode = createAction(constants.OPEN_SEARCH_PAGE);

export const changeSearchQuery = createAction(constants.CHANGE_SEARCH_QUERY);


export const move = moveFunction(constants.SEARCH_NAVIGATION_UP, constants.SEARCH_NAVIGATION_DOWN);

export const trackRecentSuggestion = (contentType, text, url, to) =>
  createAction(constants.TRACK_RECENT_SUGGESTION)({
    contentType,
    text,
    to,
    url
  });

export const resetNavigation = createAction(constants.SEARCH_NAVIGATION_RESET);
export const setSearchNavigation = createAction(constants.SEARCH_NAVIGATION_SET);
