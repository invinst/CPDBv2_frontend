import {
  POPUP_REQUEST_FAILURE,
  POPUP_REQUEST_START,
  POPUP_REQUEST_SUCCESS,
  POPUP_API_URL,
} from 'utils/constants';
import { get } from 'actions/common/async-action';


export const fetchPopup = page => (get(
  `${POPUP_API_URL}?page=${page}`,
  [
    POPUP_REQUEST_START,
    POPUP_REQUEST_SUCCESS,
    POPUP_REQUEST_FAILURE,
  ]
)());
