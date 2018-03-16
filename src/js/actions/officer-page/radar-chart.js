import { get } from 'actions/common/async-action';
import * as constants from 'utils/constants';


export const fetchPercentile = offficerId => (get(
  `${constants.OFFICER_URL}${offficerId}/percentile/`,
  [
    constants.PERCENTILE_REQUEST_START,
    constants.PERCENTILE_REQUEST_SUCCESS,
    constants.PERCENTILE_REQUEST_FAILURE
  ]
)());

