import {
  DOCUMENT_OVERVIEW_REQUEST_START,
  DOCUMENT_OVERVIEW_REQUEST_SUCCESS,
  DOCUMENT_OVERVIEW_REQUEST_FAILURE,
  DOCUMENTS_URL
} from 'utils/constants';
import { get } from 'actions/common/async-action';


export const fetchDocuments = (params) => (get(
  `${DOCUMENTS_URL}`,
  [
    DOCUMENT_OVERVIEW_REQUEST_START,
    DOCUMENT_OVERVIEW_REQUEST_SUCCESS,
    DOCUMENT_OVERVIEW_REQUEST_FAILURE
  ]
)({ ...params }));

