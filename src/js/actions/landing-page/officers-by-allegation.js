import { get } from 'actions/common/async-action';
import * as constants from 'utils/constants';


export const requestOfficersByAllegation = get(
  constants.OFFICERS_BY_ALLEGATION_API_URL,
  [
    constants.OFFICERS_BY_ALLEGATION_REQUEST_START,
    constants.OFFICERS_BY_ALLEGATION_REQUEST_SUCCESS,
    constants.OFFICERS_BY_ALLEGATION_REQUEST_FAILURE
  ]
);

