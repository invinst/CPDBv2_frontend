import { get } from 'actions/common/async-action';

import {
  TRR_URL,
  TRR_REQUEST_START,
  TRR_REQUEST_SUCCESS,
  TRR_REQUEST_FAILURE,
} from 'utils/constants';


export const fetchTRR = trrId => (get(
  `${TRR_URL}${trrId}/`,
  [TRR_REQUEST_START, TRR_REQUEST_SUCCESS, TRR_REQUEST_FAILURE]
)());
