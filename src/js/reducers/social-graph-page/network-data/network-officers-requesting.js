import createRequestingReducer from 'reducers/common/requesting';

import {
  SOCIAL_GRAPH_OFFICERS_REQUEST_START,
  SOCIAL_GRAPH_OFFICERS_REQUEST_SUCCESS,
  SOCIAL_GRAPH_OFFICERS_REQUEST_FAILURE,
} from 'utils/constants';

export default createRequestingReducer(
  SOCIAL_GRAPH_OFFICERS_REQUEST_START,
  SOCIAL_GRAPH_OFFICERS_REQUEST_SUCCESS,
  SOCIAL_GRAPH_OFFICERS_REQUEST_FAILURE,
);
