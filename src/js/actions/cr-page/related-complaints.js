import { get } from 'actions/common/async-action';


import {
  CR_URL,
  RELATED_COMPLAINTS_BY_CATEGORY_REQUEST_START,
  RELATED_COMPLAINTS_BY_CATEGORY_REQUEST_SUCCESS,
  RELATED_COMPLAINTS_BY_CATEGORY_REQUEST_FAILURE,
  RELATED_COMPLAINTS_BY_OFFICER_REQUEST_START,
  RELATED_COMPLAINTS_BY_OFFICER_REQUEST_SUCCESS,
  RELATED_COMPLAINTS_BY_OFFICER_REQUEST_FAILURE
} from 'utils/constants';


const fetchRelatedComplaintsByCategory = (crid, distance) => (get(
  `${CR_URL}${crid}/related-complaints/?match=categories&distance=${distance}`,
  [
    RELATED_COMPLAINTS_BY_CATEGORY_REQUEST_START,
    RELATED_COMPLAINTS_BY_CATEGORY_REQUEST_SUCCESS,
    RELATED_COMPLAINTS_BY_CATEGORY_REQUEST_FAILURE
  ]
)());

const fetchRelatedComplaintsByOfficer = (crid, distance) => (get(
  `${CR_URL}${crid}/related-complaints/?match=officers&distance=${distance}`,
  [
    RELATED_COMPLAINTS_BY_OFFICER_REQUEST_START,
    RELATED_COMPLAINTS_BY_OFFICER_REQUEST_SUCCESS,
    RELATED_COMPLAINTS_BY_OFFICER_REQUEST_FAILURE
  ]
)());

export const fetchRelatedComplaints = (crid, match, distance) => (
  match === 'categories'
  ? fetchRelatedComplaintsByCategory(crid, distance)
  : fetchRelatedComplaintsByOfficer(crid, distance)
);
