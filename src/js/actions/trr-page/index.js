import { get, post } from 'actions/common/async-action';

import {
  TRR_URL,
  TRR_REQUEST_START,
  TRR_REQUEST_SUCCESS,
  TRR_REQUEST_FAILURE,
  TRR_REQUEST_DOC_START,
  TRR_REQUEST_DOC_SUCCESS,
  TRR_REQUEST_DOC_FAILURE,
} from 'utils/constants';


export const fetchTRR = trrId => (get(
  `${TRR_URL}${trrId}/`,
  [TRR_REQUEST_START, TRR_REQUEST_SUCCESS, TRR_REQUEST_FAILURE]
)());

export const requestDocument = ({ id, email }) => post(
  `${TRR_URL}${id}/request-document/`,
  [TRR_REQUEST_DOC_START, TRR_REQUEST_DOC_SUCCESS, TRR_REQUEST_DOC_FAILURE]
)({ email: email });
