import { get } from 'actions/common/async-action';

import { CR_URL, CR_REQUEST_START, CR_REQUEST_SUCCESS, CR_REQUEST_FAILURE } from 'utils/constants';


export const fetchCR = crid => (get(
  `${CR_URL}${crid}/`,
  [CR_REQUEST_START, CR_REQUEST_SUCCESS, CR_REQUEST_FAILURE]
)());
