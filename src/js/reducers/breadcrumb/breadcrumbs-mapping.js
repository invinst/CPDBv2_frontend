import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';


const buildPinboardBreadcrumbs = (state, action) => {
  const title = action.payload['title'];
  return {
    [`/pinboard/${action.payload['id']}/`]: title ? `Pinboard - ${title}` : 'Pinboard',
    ...state,
  };
};

const breadcrumbMapping = handleActions({
  [constants.CR_REQUEST_SUCCESS]: (state, action) => ({
    [`/complaint/${action.payload.crid}/`]: `CR ${action.payload.crid}`,
    ...state,
  }),
  [constants.TRR_REQUEST_SUCCESS]: (state, action) => ({
    [`/trr/${action.payload.id}/`]: `TRR ${action.payload.id}`,
    ...state,
  }),
  [constants.OFFICER_SUMMARY_REQUEST_SUCCESS]: (state, action) => ({
    [`/officer/${action.payload.id}/`]: action.payload['full_name'],
    ...state,
  }),
  [constants.UNIT_PROFILE_SUMMARY_REQUEST_SUCCESS]: (state, action) => ({
    [`/unit/${action.payload['unit_name']}/`]: `${action.payload['unit_name']} ${action.payload['description']}`,
    ...state,
  }),
  [constants.DOCUMENT_DEDUPLICATOR_REQUEST_SUCCESS]: (state, action) => {
    const crid = action.request.params.crid;
    return {
      [`/documents/crid/${crid}/`]: `#${crid} document deduplicator`,
      ...state,
    };
  },
  [constants.DOCUMENT_REQUEST_SUCCESS]: (state, action) => ({
    [`/document/${action.payload['id']}/`]: action.payload['title'],
    ...state,
  }),
  [constants.UPDATE_DOCUMENT_PAGE_REQUEST_SUCCESS]: (state, action) => ({
    [`/document/${action.payload['id']}/`]: action.payload['title'],
    ...state,
  }),
  [constants.PINBOARD_CREATE_REQUEST_SUCCESS]: buildPinboardBreadcrumbs,
  [constants.PINBOARD_FETCH_REQUEST_SUCCESS]: buildPinboardBreadcrumbs,
  [constants.PINBOARD_UPDATE_REQUEST_SUCCESS]: buildPinboardBreadcrumbs,
  [constants.PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS]: buildPinboardBreadcrumbs,
}, constants.BREADSCRUMB_DEFAULT_MAPPING);

export default breadcrumbMapping;
