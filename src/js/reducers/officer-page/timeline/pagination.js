import { handleActions } from 'redux-actions';

import { OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS, OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE } from 'utils/constants';

export default handleActions({
  [OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS]: (state, { payload }) => ({
    'next': payload.next,
    'previous': payload.previous
  }),
  [OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE]: (state, { payload }) => ({
    'next': null,
    'previous': null
  })
}, { 'next': null, 'previous': null });
