import { createAction } from 'redux-actions';
import { map, entries } from 'lodash';

import { get, post, put } from 'actions/common/async-action';
import * as constants from 'utils/constants';


export const addItemToPinboard = createAction(constants.ADD_ITEM_TO_PINBOARD);

export const removeItemInPinboardPage = createAction(constants.REMOVE_ITEM_IN_PINBOARD_PAGE,
  item => ({ ...item, isPinned: true }));

export const addItemInPinboardPage = createAction(constants.ADD_ITEM_IN_PINBOARD_PAGE,
  item => ({ ...item, isPinned: false }));

export const createPinboard = ({ officerIds, crids, trrIds }) => post(
  constants.PINBOARDS_URL,
  [
    constants.PINBOARD_CREATE_REQUEST_START,
    constants.PINBOARD_CREATE_REQUEST_SUCCESS,
    constants.PINBOARD_CREATE_REQUEST_FAILURE,
  ]
)({ 'officer_ids': officerIds, crids: crids, 'trr_ids': trrIds });

export const updatePinboard = ({ id, title, officerIds, crids, trrIds }) => put(
  `${constants.PINBOARDS_URL}${id}/`,
  [
    constants.PINBOARD_UPDATE_REQUEST_START,
    constants.PINBOARD_UPDATE_REQUEST_SUCCESS,
    constants.PINBOARD_UPDATE_REQUEST_FAILURE,
  ]
)({ title: title, 'officer_ids': officerIds, crids: crids, 'trr_ids': trrIds });

export const fetchPinboard = id => get(
  `${constants.PINBOARDS_URL}${id}/`,
  [
    constants.PINBOARD_FETCH_REQUEST_START,
    constants.PINBOARD_FETCH_REQUEST_SUCCESS,
    constants.PINBOARD_FETCH_REQUEST_FAILURE,
  ]
)();

export const fetchPinboardSocialGraph = id => get(
  `${constants.PINBOARDS_URL}${id}/social-graph/`,
  [
    constants.PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_START,
    constants.PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS,
    constants.PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_FAILURE,
  ]
)();

export const fetchPinboardGeographicData = id => get(
  `${constants.PINBOARDS_URL}${id}/geographic-data/`,
  [
    constants.PINBOARD_GEOGRAPHIC_DATA_FETCH_REQUEST_START,
    constants.PINBOARD_GEOGRAPHIC_DATA_FETCH_REQUEST_SUCCESS,
    constants.PINBOARD_GEOGRAPHIC_DATA_FETCH_REQUEST_FAILURE,
  ]
)();

export const changePinboardTab = createAction(constants.CHANGE_PINBOARD_TAB);

export const fetchPinboardComplaints = id => get(
  `${constants.PINBOARDS_URL}${id}/complaints/`,
  [
    constants.PINBOARD_COMPLAINTS_FETCH_REQUEST_START,
    constants.PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS,
    constants.PINBOARD_COMPLAINTS_FETCH_REQUEST_FAILURE,
  ]
)();

export const fetchPinboardOfficers = id => get(
  `${constants.PINBOARDS_URL}${id}/officers/`,
  [
    constants.PINBOARD_OFFICERS_FETCH_REQUEST_START,
    constants.PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS,
    constants.PINBOARD_OFFICERS_FETCH_REQUEST_FAILURE,
  ]
)();

export const fetchPinboardTRRs = id => get(
  `${constants.PINBOARDS_URL}${id}/trrs/`,
  [
    constants.PINBOARD_TRRS_FETCH_REQUEST_START,
    constants.PINBOARD_TRRS_FETCH_REQUEST_SUCCESS,
    constants.PINBOARD_TRRS_FETCH_REQUEST_FAILURE,
  ]
)();

const getWithPaginate = (pinboardRelevantAPI, types) => (id, params) => {
  const queryString = map(entries(params), ([key, val]) => `${key}=${val}`).join('&');
  const url = `${constants.PINBOARDS_URL}${id}/${pinboardRelevantAPI}/?${queryString}`;

  return get(url, types)();
};

export const fetchPinboardRelevantDocuments = getWithPaginate(
  'relevant-documents',
  [
    constants.PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_START,
    constants.PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_SUCCESS,
    constants.PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_FAILURE,
  ]
);
export const fetchPinboardRelevantCoaccusals = getWithPaginate(
  'relevant-coaccusals',
  [
    constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_START,
    constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_SUCCESS,
    constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_FAILURE,
  ]
);
export const fetchPinboardRelevantComplaints = getWithPaginate(
  'relevant-complaints',
  [
    constants.PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_START,
    constants.PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_SUCCESS,
    constants.PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_FAILURE,
  ]
);

export const fetchLatestRetrievedPinboard = () => get(
  `${constants.PINBOARDS_URL}latest-retrieved-pinboard/`,
  [
    constants.PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_START,
    constants.PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
    constants.PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_FAILURE,
  ]
)();
