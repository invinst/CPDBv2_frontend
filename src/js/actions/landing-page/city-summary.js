import { get } from 'actions/common/async-action';
import * as constants from 'utils/constants';


export const getCitySummary = get(
  constants.CITY_SUMMARY_API_URL,
  [
    constants.CITY_SUMMARY_REQUEST_START,
    constants.CITY_SUMMARY_REQUEST_SUCCESS,
    constants.CITY_SUMMARY_REQUEST_FAILURE,
  ]
);
