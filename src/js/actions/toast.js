import {
  TOAST_REQUEST_FAILURE,
  TOAST_REQUEST_START,
  TOAST_REQUEST_SUCCESS,
  TOAST_API_URL,
} from 'utils/constants';
import { get } from 'actions/common/async-action';


export const fetchToast = get(
  TOAST_API_URL,
  [
    TOAST_REQUEST_START,
    TOAST_REQUEST_SUCCESS,
    TOAST_REQUEST_FAILURE,
  ]
);
