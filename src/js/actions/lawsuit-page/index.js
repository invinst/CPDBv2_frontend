import {
  LAWSUIT_FETCH_START,
  LAWSUIT_FETCH_FAILURE,
  LAWSUIT_FETCH_SUCCESS,
  LAWSUIT_API_URL,
} from 'utils/constants';
import { get } from 'actions/common/async-action';


export const fetchLawsuit = (caseNo) => get(
  `${LAWSUIT_API_URL}${caseNo}/`,
  [
    LAWSUIT_FETCH_START,
    LAWSUIT_FETCH_SUCCESS,
    LAWSUIT_FETCH_FAILURE,
  ]
)();
