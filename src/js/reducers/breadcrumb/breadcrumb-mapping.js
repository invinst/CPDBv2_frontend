import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';
import { lawsuitPath } from 'utils/paths';


const buildPinboardBreadcrumbs = (state, action) => {
  const title = action.payload['title'];
  return {
    ...state,
    [`/pinboard/${action.payload['id']}/`]: title ? `Pinboard - ${title}` : 'Pinboard',
  };
};

const breadcrumbMapping = handleActions({
  [constants.CR_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    [`/complaint/${action.payload.crid}/`]: `CR ${action.payload.crid}`,
  }),
  [constants.TRR_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    [`/trr/${action.payload.id}/`]: `TRR ${action.payload.id}`,
  }),
  [constants.LAWSUIT_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    [lawsuitPath(action.payload['case_no'])]: `Case ${action.payload['case_no']}`,
  }),
  [constants.OFFICER_SUMMARY_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    [`/officer/${action.payload.id}/`]: action.payload['full_name'],
  }),
  [constants.UNIT_PROFILE_SUMMARY_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    [`/unit/${action.payload['unit_name']}/`]: `${action.payload['unit_name']} ${action.payload['description']}`,
  }),
  [constants.DOCUMENT_DEDUPLICATOR_REQUEST_SUCCESS]: (state, action) => {
    const crid = action.request.params.crid;
    return {
      ...state,
      [`/documents/crid/${crid}/`]: `#${crid} document deduplicator`,
    };
  },
  [constants.DOCUMENT_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    [`/document/${action.payload['id']}/`]: action.payload['title'],
  }),
  [constants.UPDATE_DOCUMENT_PAGE_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    [`/document/${action.payload['id']}/`]: action.payload['title'],
  }),
  [constants.PINBOARD_CREATE_REQUEST_SUCCESS]: buildPinboardBreadcrumbs,
  [constants.PINBOARD_FETCH_REQUEST_SUCCESS]: buildPinboardBreadcrumbs,
  [constants.PINBOARD_UPDATE_REQUEST_SUCCESS]: buildPinboardBreadcrumbs,
  [constants.PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS]: buildPinboardBreadcrumbs,
}, []);

export default breadcrumbMapping;
