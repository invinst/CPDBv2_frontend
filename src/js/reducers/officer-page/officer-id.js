import { handleActions } from 'redux-actions';

import { getOfficerId } from 'utils/location';
import {
  OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS,
  OFFICER_SUMMARY_REQUEST_SUCCESS,
  CHANGE_OFFICER_ID
} from 'utils/constants';


export default handleActions({
  [OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS]: (state, { request }) => getOfficerId(request.url),
  [OFFICER_SUMMARY_REQUEST_SUCCESS]: (state, { request }) => getOfficerId(request.url),
  [CHANGE_OFFICER_ID]: (state, action) => action.payload || state
}, null);
