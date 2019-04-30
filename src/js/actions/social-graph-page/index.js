import { get } from 'actions/common/async-action';
import * as constants from 'utils/constants';
import { createAction } from 'redux-actions';


export const requestSocialGraph = (params) => get(
  constants.SOCIAL_GRAPH_API_URL,
  [
    constants.SOCIAL_GRAPH_REQUEST_START,
    constants.SOCIAL_GRAPH_REQUEST_SUCCESS,
    constants.SOCIAL_GRAPH_REQUEST_FAILURE
  ]
)(params);

export const requestSocialGraphAllegations = (params) => get(
  constants.SOCIAL_GRAPH_ALLEGATIONS_API_URL,
  [
    constants.SOCIAL_GRAPH_ALLEGATIONS_REQUEST_START,
    constants.SOCIAL_GRAPH_ALLEGATIONS_REQUEST_SUCCESS,
    constants.SOCIAL_GRAPH_ALLEGATIONS_REQUEST_FAILURE
  ]
)(params);

export const requestGeographic = (params) => get(
  constants.SOCIAL_GRAPH_GEOGRAPHIC_API_URL,
  [
    constants.GEOGRAPHIC_REQUEST_START,
    constants.GEOGRAPHIC_REQUEST_SUCCESS,
    constants.GEOGRAPHIC_REQUEST_FAILURE
  ]
)(params);

export const changeNetworkTab = createAction(constants.CHANGE_NETWORK_TAB);

export const changeMainTab = createAction(constants.CHANGE_SOCIAL_GRAPH_MAIN_TAB);
