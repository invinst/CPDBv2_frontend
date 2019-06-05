import { get } from 'actions/common/async-action';
import * as constants from 'utils/constants';
import { createAction } from 'redux-actions';


export const requestSocialGraphNetwork = (params) => get(
  constants.SOCIAL_GRAPH_NETWORK_API_URL,
  [
    constants.SOCIAL_GRAPH_NETWORK_REQUEST_START,
    constants.SOCIAL_GRAPH_NETWORK_REQUEST_SUCCESS,
    constants.SOCIAL_GRAPH_NETWORK_REQUEST_FAILURE
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

export const requestSocialGraphGeographic = (params) => get(
  constants.SOCIAL_GRAPH_GEOGRAPHIC_API_URL,
  [
    constants.SOCIAL_GRAPH_GEOGRAPHIC_REQUEST_START,
    constants.SOCIAL_GRAPH_GEOGRAPHIC_REQUEST_SUCCESS,
    constants.SOCIAL_GRAPH_GEOGRAPHIC_REQUEST_FAILURE
  ]
)(params);

export const requestSocialGraphGeographicPreviewPane = (params) => get(
  constants.SOCIAL_GRAPH_DETAIL_GEOGRAPHIC_API_URL,
  [
    constants.SOCIAL_GRAPH_GEOGRAPHIC_PREVIEW_PANE_REQUEST_START,
    constants.SOCIAL_GRAPH_GEOGRAPHIC_PREVIEW_PANE_REQUEST_SUCCESS,
    constants.SOCIAL_GRAPH_GEOGRAPHIC_PREVIEW_PANE_REQUEST_FAILURE
  ]
)(params);

export const requestSocialGraphOfficers = (params) => get(
  constants.SOCIAL_GRAPH_OFFICERS_API_URL,
  [
    constants.SOCIAL_GRAPH_OFFICERS_REQUEST_START,
    constants.SOCIAL_GRAPH_OFFICERS_REQUEST_SUCCESS,
    constants.SOCIAL_GRAPH_OFFICERS_REQUEST_FAILURE
  ]
)(params);

export const changeNetworkTab = createAction(constants.CHANGE_NETWORK_TAB);

export const changeMainTab = createAction(constants.CHANGE_SOCIAL_GRAPH_MAIN_TAB);

export const updateOfficerId = createAction(constants.UPDATE_OFFICER_ID);

export const updateSocialGraphTimelineIdx = createAction(constants.UPDATE_SOCIAL_GRAPH_TIMELINE_IDX);

export const updateSocialGraphTimelineIdxFromTimelineTab = createAction(
  constants.UPDATE_SOCIAL_GRAPH_TIMELINE_IDX_FROM_TIMELINE_TAB
);

export const updateSocialGraphRefreshIntervalId = createAction(constants.UPDATE_SOCIAL_GRAPH_REFRESH_INTERVAL_ID);

export const updateGeographicCrid = createAction(constants.UPDATE_GEOGRAPHIC_CRID);

export const updateGeographicTrrId = createAction(constants.UPDATE_GEOGRAPHIC_TRR_ID);
