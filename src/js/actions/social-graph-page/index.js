import { get } from 'actions/common/async-action';
import * as constants from 'utils/constants';


export const requestSocialGraph = (params) => get(
  constants.SOCIAL_GRAPH_API_URL,
  [
    constants.SOCIAL_GRAPH_REQUEST_START,
    constants.SOCIAL_GRAPH_REQUEST_SUCCESS,
    constants.SOCIAL_GRAPH_REQUEST_FAILURE,
  ]
)(params);
