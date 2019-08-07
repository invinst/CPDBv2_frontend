import { get } from 'actions/common/async-action';
import * as constants from 'utils/constants';
import { createAction } from 'redux-actions';
import { merge } from 'lodash';


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

export const requestFirstPageSocialGraphGeographicCrs = (params) => get(
  constants.SOCIAL_GRAPH_GEOGRAPHIC_CRS_API_URL,
  [
    constants.FIRST_PAGE_GEOGRAPHIC_CRS_REQUEST_START,
    constants.FIRST_PAGE_GEOGRAPHIC_CRS_REQUEST_SUCCESS,
    constants.FIRST_PAGE_GEOGRAPHIC_CRS_REQUEST_FAILURE
  ]
)(params);

export const requestOtherPagesSocialGraphGeographicCrs = (params) => get(
  constants.SOCIAL_GRAPH_GEOGRAPHIC_CRS_API_URL,
  [
    constants.GEOGRAPHIC_CRS_REQUEST_START,
    constants.GEOGRAPHIC_CRS_REQUEST_SUCCESS,
    constants.GEOGRAPHIC_CRS_REQUEST_FAILURE
  ]
)(params);

export const requestFirstPageSocialGraphGeographicTrrs = (params) => get(
  constants.SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_URL,
  [
    constants.FIRST_PAGE_GEOGRAPHIC_TRRS_REQUEST_START,
    constants.FIRST_PAGE_GEOGRAPHIC_TRRS_REQUEST_SUCCESS,
    constants.FIRST_PAGE_GEOGRAPHIC_TRRS_REQUEST_FAILURE
  ]
)(params);

export const requestOtherPagesSocialGraphGeographicTrrs = (params) => get(
  constants.SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_URL,
  [
    constants.GEOGRAPHIC_TRRS_REQUEST_START,
    constants.GEOGRAPHIC_TRRS_REQUEST_SUCCESS,
    constants.GEOGRAPHIC_TRRS_REQUEST_FAILURE
  ]
)(params);

export const requestFirstPageSocialGraphGeographicCrsPreviewPane = (params) => get(
  constants.SOCIAL_GRAPH_GEOGRAPHIC_CRS_API_URL,
  [
    constants.FIRST_PAGE_GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_START,
    constants.FIRST_PAGE_GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_SUCCESS,
    constants.FIRST_PAGE_GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_FAILURE
  ]
)(merge({ detail: true }, params));

export const requestOtherPagesSocialGraphGeographicCrsPreviewPane = (params) => get(
  constants.SOCIAL_GRAPH_GEOGRAPHIC_CRS_API_URL,
  [
    constants.GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_START,
    constants.GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_SUCCESS,
    constants.GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_FAILURE
  ]
)(merge({ detail: true }, params));

export const requestFirstPageSocialGraphGeographicTrrsPreviewPane = (params) => get(
  constants.SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_URL,
  [
    constants.FIRST_PAGE_GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_START,
    constants.FIRST_PAGE_GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_SUCCESS,
    constants.FIRST_PAGE_GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_FAILURE
  ]
)(merge({ detail: true }, params));

export const requestOtherPagesSocialGraphGeographicTrrsPreviewPane = (params) => get(
  constants.SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_URL,
  [
    constants.GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_START,
    constants.GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_SUCCESS,
    constants.GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_FAILURE
  ]
)(merge({ detail: true }, params));

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

export const updateSelectedOfficerId = createAction(constants.UPDATE_SELECTED_OFFICER_ID);

export const updateSocialGraphTimelineIdx = createAction(constants.UPDATE_SOCIAL_GRAPH_TIMELINE_IDX);

export const updateSocialGraphTimelineIdxFromTimelineTab = createAction(
  constants.UPDATE_SOCIAL_GRAPH_TIMELINE_IDX_FROM_TIMELINE_TAB
);

export const updateSocialGraphRefreshIntervalId = createAction(constants.UPDATE_SOCIAL_GRAPH_REFRESH_INTERVAL_ID);

export const updateSocialGraphSelectedEdge = createAction(constants.UPDATE_SOCIAL_GRAPH_SELECTED_EDGE);

export const updateSocialGraphSelectedCrid = createAction(constants.UPDATE_SOCIAL_GRAPH_SELECTED_CRID);

export const updateGeographicCrid = createAction(constants.UPDATE_GEOGRAPHIC_CRID);

export const updateGeographicTrrId = createAction(constants.UPDATE_GEOGRAPHIC_TRR_ID);
