import { get } from 'actions/common/async-action';
import * as constants from 'utils/constants';


export const getRecentDocument = get(
  constants.RECENT_DOCUMENT_URL,
  [
    constants.RECENT_DOCUMENT_REQUEST_START,
    constants.RECENT_DOCUMENT_REQUEST_SUCCESS,
    constants.RECENT_DOCUMENT_REQUEST_FAILURE
  ]
);
