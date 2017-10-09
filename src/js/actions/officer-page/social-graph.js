import { createAction } from 'redux-actions';

import { get } from 'actions/common/async-action';
import * as constants from 'utils/constants';


export const fetchSocialGraph = offficerId => (get(
  `${constants.OFFICER_URL}${offficerId}/social-graph/`,
  [
    constants.OFFICER_SOCIAL_GRAPH_REQUEST_START,
    constants.OFFICER_SOCIAL_GRAPH_REQUEST_SUCCESS,
    constants.OFFICER_SOCIAL_GRAPH_REQUEST_FAILURE
  ]
)());

export const setYearRange = createAction(constants.OFFICER_SOCIAL_GRAPH_SET_YEAR_RANGE);
