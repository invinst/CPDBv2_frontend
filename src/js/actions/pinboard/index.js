import { createAction } from 'redux-actions';
import { map, entries } from 'lodash';
import { CancelToken } from 'axios';

import { get, post, put } from 'actions/common/async-action';
import * as constants from 'utils/constants';


export const addOrRemoveItemInPinboard = createAction(constants.ADD_OR_REMOVE_ITEM_IN_PINBOARD);

export const removeItemInPinboardPage = createAction(constants.REMOVE_ITEM_IN_PINBOARD_PAGE,
  item => ({ ...item, isPinned: true }));

export const addItemInPinboardPage = createAction(constants.ADD_ITEM_IN_PINBOARD_PAGE,
  item => ({ ...item, isPinned: false }));

export const orderPinboard = createAction(constants.ORDER_PINBOARD);

export const updatePinboardInfo = createAction(constants.UPDATE_PINBOARD_INFO);

export const addItemToPinboardState = createAction(constants.ADD_ITEM_TO_PINBOARD_STATE);
export const removeItemFromPinboardState = createAction(constants.REMOVE_ITEM_FROM_PINBOARD_STATE);
export const completeRemoveItemFromPinboard = createAction(constants.COMPLETE_REMOVE_ITEM_FROM_PINBOARD);
export const orderPinboardState = createAction(constants.ORDER_PINBOARD_STATE);
export const updatePinboardInfoState = createAction(constants.UPDATE_PINBOARD_INFO_STATE);
export const savePinboard = createAction(constants.SAVE_PINBOARD);

export const performFetchPinboardRelatedData = createAction(constants.PERFORM_FETCH_PINBOARD_RELATED_DATA);

let pinboardSource;
const cancelFetchRequests = (newRequest) => (...args) => {
  if (pinboardSource)
    pinboardSource.cancel(constants.REQUEST_CANCEL_MESSAGE);

  pinboardSource = CancelToken.source();
  return newRequest(...args);
};

export const createPinboard = cancelFetchRequests(
  ({ title, officerIds, crids, trrIds, sourcePinboardId }) => post(
    constants.PINBOARDS_URL,
    [
      constants.PINBOARD_CREATE_REQUEST_START,
      constants.PINBOARD_CREATE_REQUEST_SUCCESS,
      constants.PINBOARD_CREATE_REQUEST_FAILURE,
    ],
    pinboardSource && pinboardSource.token
  )({ title, 'officer_ids': officerIds, 'crids': crids, 'trr_ids': trrIds, 'source_pinboard_id': sourcePinboardId })
);

export const createNewPinboard = cancelFetchRequests(
  ({ officerIds, crids, trrIds, sourcePinboardId }) => post(
    constants.PINBOARDS_URL,
    [
      constants.PINBOARD_CREATE_NEW_REQUEST_START,
      constants.PINBOARD_CREATE_NEW_REQUEST_SUCCESS,
      constants.PINBOARD_CREATE_NEW_REQUEST_FAILURE,
    ],
    pinboardSource && pinboardSource.token
  )({ 'officer_ids': officerIds, 'crids': crids, 'trr_ids': trrIds, 'source_pinboard_id': sourcePinboardId })
);

export const createNewEmptyPinboard = () => createNewPinboard({ 'officerIds': [], 'crids': [], 'trrIds': [] });

export const duplicatePinboard = (sourcePinboardId) => createNewPinboard({ sourcePinboardId });

export const updatePinboard = cancelFetchRequests(
  ({ id, title, description, officerIds, crids, trrIds }) => put(
    `${constants.PINBOARDS_URL}${id}/`,
    [
      constants.PINBOARD_UPDATE_REQUEST_START,
      constants.PINBOARD_UPDATE_REQUEST_SUCCESS,
      constants.PINBOARD_UPDATE_REQUEST_FAILURE,
    ],
    pinboardSource && pinboardSource.token
  )({ title: title, description: description, 'officer_ids': officerIds, crids: crids, 'trr_ids': trrIds })
);

export const updatePinboardFromSource = cancelFetchRequests(
  (id, sourcePinboardId) => put(
    `${constants.PINBOARDS_URL}${id}/`,
    [
      constants.PINBOARD_UPDATE_FROM_SOURCE_REQUEST_START,
      constants.PINBOARD_UPDATE_FROM_SOURCE_REQUEST_SUCCESS,
      constants.PINBOARD_UPDATE_FROM_SOURCE_REQUEST_FAILURE,
    ],
    pinboardSource && pinboardSource.token
  )({ 'source_pinboard_id': sourcePinboardId })
);

export const fetchPinboard = cancelFetchRequests(
  id => get(
    `${constants.PINBOARDS_URL}${id}/`,
    [
      constants.PINBOARD_FETCH_REQUEST_START,
      constants.PINBOARD_FETCH_REQUEST_SUCCESS,
      constants.PINBOARD_FETCH_REQUEST_FAILURE,
    ],
    pinboardSource && pinboardSource.token
  )()
);

export const fetchPinboardSocialGraph = id => get(
  constants.SOCIAL_GRAPH_NETWORK_API_URL,
  [
    constants.PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_START,
    constants.PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS,
    constants.PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_FAILURE,
    constants.PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_CANCELLED,
  ],
  pinboardSource && pinboardSource.token
)({ 'pinboard_id': id });

export const fetchPinboardGeographic = createAction(constants.PINBOARD_GEOGRAPHIC_FETCH_REQUEST_START);

export const fetchFirstPagePinboardGeographicCrs = (params) => get(
  constants.SOCIAL_GRAPH_GEOGRAPHIC_CRS_API_URL,
  [
    constants.FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_START,
    constants.FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS,
    constants.FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_FAILURE,
    constants.FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_CANCELLED,
  ],
  pinboardSource && pinboardSource.token
)(params);

export const fetchFirstPagePinboardGeographicTrrs = (params) => get(
  constants.SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_URL,
  [
    constants.FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_START,
    constants.FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS,
    constants.FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_FAILURE,
    constants.FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_CANCELLED,
  ],
  pinboardSource && pinboardSource.token
)(params);

export const fetchOtherPagesPinboardGeographicCrs = (params) => get(
  constants.SOCIAL_GRAPH_GEOGRAPHIC_CRS_API_URL,
  [
    constants.PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_START,
    constants.PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS,
    constants.PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_FAILURE,
    constants.PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_CANCELLED,
  ],
  pinboardSource && pinboardSource.token
)(params);

export const fetchOtherPagesPinboardGeographicTrrs = (params) => get(
  constants.SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_URL,
  [
    constants.PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_START,
    constants.PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS,
    constants.PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_FAILURE,
    constants.PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_CANCELLED,
  ],
  pinboardSource && pinboardSource.token
)(params);

export const fetchPinboardComplaints = id => get(
  `${constants.PINBOARDS_URL}${id}/complaints/`,
  [
    constants.PINBOARD_COMPLAINTS_FETCH_REQUEST_START,
    constants.PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS,
    constants.PINBOARD_COMPLAINTS_FETCH_REQUEST_FAILURE,
    constants.PINBOARD_COMPLAINTS_FETCH_REQUEST_CANCELLED,
  ],
  pinboardSource && pinboardSource.token
)();

export const fetchPinboardOfficers = id => get(
  `${constants.PINBOARDS_URL}${id}/officers/`,
  [
    constants.PINBOARD_OFFICERS_FETCH_REQUEST_START,
    constants.PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS,
    constants.PINBOARD_OFFICERS_FETCH_REQUEST_FAILURE,
    constants.PINBOARD_OFFICERS_FETCH_REQUEST_CANCELLED,
  ],
  pinboardSource && pinboardSource.token
)();

export const fetchPinboardTRRs = id => get(
  `${constants.PINBOARDS_URL}${id}/trrs/`,
  [
    constants.PINBOARD_TRRS_FETCH_REQUEST_START,
    constants.PINBOARD_TRRS_FETCH_REQUEST_SUCCESS,
    constants.PINBOARD_TRRS_FETCH_REQUEST_FAILURE,
    constants.PINBOARD_TRRS_FETCH_REQUEST_CANCELLED,
  ],
  pinboardSource && pinboardSource.token
)();

const getWithPaginate = (pinboardRelevantAPI, types) => (id, params) => {
  const queryString = map(entries(params), ([key, val]) => `${key}=${val}`).join('&');
  const url = `${constants.PINBOARDS_URL}${id}/${pinboardRelevantAPI}/?${queryString}`;
  return get(url, types, pinboardSource && pinboardSource.token)();
};

export const fetchPinboardRelevantDocuments = getWithPaginate(
  'relevant-documents',
  [
    constants.PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_START,
    constants.PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_SUCCESS,
    constants.PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_FAILURE,
    constants.PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_CANCELLED,
  ]
);
export const fetchPinboardRelevantCoaccusals = getWithPaginate(
  'relevant-coaccusals',
  [
    constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_START,
    constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_SUCCESS,
    constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_FAILURE,
    constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_CANCELLED,
  ]
);
export const fetchPinboardRelevantComplaints = getWithPaginate(
  'relevant-complaints',
  [
    constants.PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_START,
    constants.PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_SUCCESS,
    constants.PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_FAILURE,
    constants.PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_CANCELLED,
  ]
);

export const fetchLatestRetrievedPinboard = get(
  `${constants.PINBOARDS_URL}latest-retrieved-pinboard/`,
  [
    constants.PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_START,
    constants.PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
    constants.PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_FAILURE,
  ]
);
