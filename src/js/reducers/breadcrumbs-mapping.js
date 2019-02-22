import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';


const breadcrumbMapping = handleActions({
  [constants.CR_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    [`/complaint/${action.payload.crid}/`]: `CR ${action.payload.crid}`
  }),
  [constants.TRR_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    [`/trr/${action.payload.id}/`]: `TRR ${action.payload.id}`
  }),
  [constants.OFFICER_SUMMARY_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    [`/officer/${action.payload.id}/`]: action.payload['full_name']
  }),
  [constants.UNIT_PROFILE_SUMMARY_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    [`/unit/${action.payload['unit_name']}/`]: `${action.payload['unit_name']} ${action.payload['description']}`
  }),
  [constants.DOCUMENT_DEDUPLICATOR_REQUEST_SUCCESS]: (state, action) => {
    const crid = action.request.params.crid;
    return {
      ...state,
      [`/documents/crid/${crid}/`]: `#${crid} document deduplicator`
    };
  }
}, {});

export default breadcrumbMapping;
