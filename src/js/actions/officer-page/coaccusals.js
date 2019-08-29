import {
  OFFICER_COACCUSALS_REQUEST_FAILURE,
  OFFICER_COACCUSALS_REQUEST_START,
  OFFICER_COACCUSALS_REQUEST_SUCCESS,
  OFFICER_URL,
} from 'utils/constants';
import { get } from 'actions/common/async-action';


export const fetchCoaccusals = (officerId) => (get(
  `${OFFICER_URL}${officerId}/coaccusals/`,
  [
    OFFICER_COACCUSALS_REQUEST_START,
    OFFICER_COACCUSALS_REQUEST_SUCCESS,
    OFFICER_COACCUSALS_REQUEST_FAILURE,
  ]
)());
