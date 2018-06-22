import { get, post } from 'actions/common/async-action';

import {
  CR_URL,
  CR_REQUEST_START,
  CR_REQUEST_SUCCESS,
  CR_REQUEST_FAILURE,
  CR_REQUEST_DOC_START,
  CR_REQUEST_DOC_SUCCESS,
  CR_REQUEST_DOC_FAILURE,
} from 'utils/constants';


export const fetchCR = crid => (get(
  `${CR_URL}${crid}/`,
  [CR_REQUEST_START, CR_REQUEST_SUCCESS, CR_REQUEST_FAILURE]
)());

export const requestDocument = ({ id, email }) => post(
  `${CR_URL}${id}/request-document/`,
  [CR_REQUEST_DOC_START, CR_REQUEST_DOC_SUCCESS, CR_REQUEST_DOC_FAILURE]
)({ email: email });
