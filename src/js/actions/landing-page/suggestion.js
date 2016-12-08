import { get } from 'actions/common/async-action';
import { createAction } from 'redux-actions';

export const SUGGESTION_URL = 'suggestion/';

export const SUGGESTION_REQUEST_START = 'SUGGESTION_REQUEST_START';
export const SUGGESTION_REQUEST_SUCCESS = 'SUGGESTION_REQUEST_SUCCESS';
export const SUGGESTION_REQUEST_FAILURE = 'SUGGESTION_REQUEST_FAILURE';

export const getSuggestion = (text, params, adapter) => get(`${SUGGESTION_URL}${text}/`, [
  SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE
])(params, adapter);

export const SELECT_TAG = 'SELECT_TAG';

export const selectTag = createAction(SELECT_TAG);
