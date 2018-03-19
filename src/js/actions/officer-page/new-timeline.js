import {
  OFFICER_NEW_TIMELINE_ITEMS_REQUEST_FAILURE,
  OFFICER_NEW_TIMELINE_ITEMS_REQUEST_START,
  OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS,
  OFFICER_URL
} from 'utils/constants';
import { get } from 'actions/common/async-action';


export const fetchNewTimelineItems = (officerId, params) => (get(
  `${OFFICER_URL}${officerId}/new-timeline-items/`,
  [
    OFFICER_NEW_TIMELINE_ITEMS_REQUEST_START,
    OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS,
    OFFICER_NEW_TIMELINE_ITEMS_REQUEST_FAILURE
  ]
)(params));
