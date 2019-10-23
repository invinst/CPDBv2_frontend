import {
  ALL_PINBOARD_REQUEST_FAILURE,
  ALL_PINBOARD_REQUEST_START,
  ALL_PINBOARD_REQUEST_SUCCESS,
  ALL_PINBOARD_URL,
} from 'utils/constants';
import { authenticatedGet } from 'actions/common/async-action';


export const fetchAllPinboards = params => authenticatedGet(
  ALL_PINBOARD_URL,
  [
    ALL_PINBOARD_REQUEST_START,
    ALL_PINBOARD_REQUEST_SUCCESS,
    ALL_PINBOARD_REQUEST_FAILURE,
  ]
)(params);
