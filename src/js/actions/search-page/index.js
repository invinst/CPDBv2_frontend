import { get } from 'actions/common/async-action';
import { createAction } from 'redux-actions';
import { CancelToken } from 'axios';

import * as constants from 'utils/constants';
import { moveFunction } from 'actions/search-page/base';


let source;

const cancelOldRequest = (newRequest) => (...args) => {
  if (source) {
    source.cancel(constants.REQUEST_CANCEL_MESSAGE);
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
      constants.SUGGESTION_REQUEST_FAILURE,
      constants.SUGGESTION_REQUEST_CANCELLED,
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
      constants.SUGGESTION_SINGLE_REQUEST_FAILURE,
      constants.SUGGESTION_SINGLE_REQUEST_CANCELLED,
    ],
    source.token
  )({ term, ...params }, adapter)
);


export const selectTag = createAction(constants.SELECT_TAG);

export const toggleSearchMode = createAction(constants.OPEN_SEARCH_PAGE);

export const changeSearchQuery = createAction(constants.CHANGE_SEARCH_QUERY);


export const move = moveFunction(constants.SEARCH_NAVIGATION_UP, constants.SEARCH_NAVIGATION_DOWN);

export const resetNavigation = createAction(constants.SEARCH_NAVIGATION_RESET);
export const setSearchNavigation = createAction(constants.SEARCH_NAVIGATION_SET);

export const fetchRecentSearchItems = ({ officerIds, crids, trrIds, lawsuitIds }) => get(
  constants.RECENT_SEARCH_ITEMS_API_URL,
  [
    constants.FETCH_RECENT_SEARCH_ITEMS_START,
    constants.FETCH_RECENT_SEARCH_ITEMS_SUCCESS,
    constants.FETCH_RECENT_SEARCH_ITEMS_FAILURE,
  ],
)({ 'officer_ids': officerIds, crids: crids, 'trr_ids': trrIds, 'lawsuit_ids': lawsuitIds });

export const fetchedEmptyRecentSearchItems = createAction(constants.FETCHED_EMPTY_RECENT_SEARCH_ITEMS);
export const saveToRecent = createAction(constants.SEARCH_SAVE_TO_RECENT);
