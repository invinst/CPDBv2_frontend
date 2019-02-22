import { authenticatedGet } from 'actions/common/async-action';
import {
  DOCUMENT_URL,
  DOCUMENT_REQUEST_START,
  DOCUMENT_REQUEST_SUCCESS,
  DOCUMENT_REQUEST_FAILURE,
} from 'utils/constants';


export const fetchDocument = documentId => (authenticatedGet(
  `${DOCUMENT_URL}${documentId}/`,
  [DOCUMENT_REQUEST_START, DOCUMENT_REQUEST_SUCCESS, DOCUMENT_REQUEST_FAILURE]
)());
