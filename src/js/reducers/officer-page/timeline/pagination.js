import { handleActions } from 'redux-actions';

import {
  OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS, OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE,
  OFFICER_TIMELINE_FLIP_SORT_ORDER, OFFICER_TIMELINE_FIRST_ITEMS_REQUEST_SUCCESS
} from 'utils/constants';

export default handleActions({
  [OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS]: (state, { payload }) => ({
    next: payload.next,
    previous: payload.previous
  }),
  [OFFICER_TIMELINE_FIRST_ITEMS_REQUEST_SUCCESS]: (state, { payload }) => ({
    next: payload.next,
    previous: null
  }),
  [OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE]: (state, { payload }) => ({
    next: null,
    previous: null
  }),
  [OFFICER_TIMELINE_FLIP_SORT_ORDER]: (state, action) => ({
    next: null,
    previous: null
  })
}, { 'next': null, 'previous': null });
