import * as constants from 'utils/constants';
import { get, authenticatedPatch } from 'actions/common/async-action';


export const updatePage = pageid => data => authenticatedPatch(
  `${constants.SLUG_PAGE_API_URL}${pageid}/`,
  [
    constants.UPDATE_CMS_PAGE_REQUEST_START,
    constants.UPDATE_CMS_PAGE_REQUEST_SUCCESS,
    constants.UPDATE_CMS_PAGE_REQUEST_FAILURE
  ]
  )(data);

export const fetchPage = pageid => get(
  `${constants.SLUG_PAGE_API_URL}${pageid}/`,
  [
    constants.CMS_PAGE_REQUEST_START,
    constants.CMS_PAGE_REQUEST_SUCCESS,
    constants.CMS_PAGE_REQUEST_FAILURE
  ]
);
