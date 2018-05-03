import { map, entries } from 'lodash';

import { get } from 'actions/common/async-action';
import * as constants from 'utils/constants';


export const fetchRelatedComplaints = (crid, params) => {
  let actionTypes;
  if (params.match === 'categories') {
    actionTypes = [
      constants.RELATED_COMPLAINTS_BY_CATEGORY_REQUEST_START,
      constants.RELATED_COMPLAINTS_BY_CATEGORY_REQUEST_SUCCESS,
      constants.RELATED_COMPLAINTS_BY_CATEGORY_REQUEST_FAILURE
    ];
  } else {
    actionTypes = [
      constants.RELATED_COMPLAINTS_BY_OFFICER_REQUEST_START,
      constants.RELATED_COMPLAINTS_BY_OFFICER_REQUEST_SUCCESS,
      constants.RELATED_COMPLAINTS_BY_OFFICER_REQUEST_FAILURE
    ];
  }
  const queryString = map(entries(params), ([key, val]) => `${key}=${val}`).join('&');
  const url = `${constants.CR_URL}${crid}/related-complaints/?${queryString}`;
  return get(url, actionTypes)();
};
