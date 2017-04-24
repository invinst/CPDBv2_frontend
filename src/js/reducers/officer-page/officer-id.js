import { handleActions } from 'redux-actions';

import {
  OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS, OFFICER_TIMELINE_MINIMAP_REQUEST_SUCCESS, OFFICER_SUMMARY_REQUEST_SUCCESS
} from 'utils/constants';

const getOfficerId = (url) => {
  return parseInt(url.replace(/.*officers\/(\d+).*/, '$1'));
};

export default handleActions({
  [OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS]: (state, { request }) => getOfficerId(request.url),
  [OFFICER_TIMELINE_MINIMAP_REQUEST_SUCCESS]: (state, { request }) => getOfficerId(request.url),
  [OFFICER_SUMMARY_REQUEST_SUCCESS]: (state, { request }) => getOfficerId(request.url)
}, null);
