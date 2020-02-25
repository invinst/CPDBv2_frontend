import { createAction } from 'redux-actions';
import { CancelToken } from 'axios';

import {
  ALL_PINBOARD_REQUEST_FAILURE,
  ALL_PINBOARD_REQUEST_START,
  ALL_PINBOARD_REQUEST_SUCCESS,
  ALL_PINBOARD_URL,
  SOCIAL_GRAPH_NETWORK_API_URL,
  PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_START,
  PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS,
  PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_FAILURE,
  CLEAR_PINBOARD_STATIC_SOCIAL_GRAPH_CACHE,
} from 'utils/constants';
import { authenticatedGet, get } from 'actions/common/async-action';


let source;

const cancelOldRequest = (newRequest) => (...args) => {
  if (source) {
    source.cancel('Cancelled by user');
  }
  source = CancelToken.source();
  return newRequest(...args);
};

export const fetchAllPinboards = cancelOldRequest(
  params => authenticatedGet(
    ALL_PINBOARD_URL,
    [
      ALL_PINBOARD_REQUEST_START,
      ALL_PINBOARD_REQUEST_SUCCESS,
      ALL_PINBOARD_REQUEST_FAILURE,
    ],
    source.token
  )(params)
);

export const fetchPinboardStaticSocialGraph = id => get(
  SOCIAL_GRAPH_NETWORK_API_URL,
  [
    PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_START,
    PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS,
    PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_FAILURE,
  ]
)({ 'pinboard_id': id, 'static': true });

export const clearPinboardStaticSocialGraphCache = createAction(CLEAR_PINBOARD_STATIC_SOCIAL_GRAPH_CACHE);
