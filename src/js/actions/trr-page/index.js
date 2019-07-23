import { createAction } from 'redux-actions';

import { get, post } from 'actions/common/async-action';
import {
  TRR_URL,
  TRR_REQUEST_START,
  TRR_REQUEST_SUCCESS,
  TRR_REQUEST_FAILURE,
  TRR_REQUEST_DOC_REQUEST_START,
  TRR_REQUEST_DOC_REQUEST_SUCCESS,
  TRR_REQUEST_DOC_REQUEST_FAILURE,
  TRR_EDIT_MODE,
  TRR_EDIT_TYPES,
} from 'utils/constants';
import { createChangeEditModeAction } from 'actions/cms';


export const fetchTRR = trrId => (get(
  `${TRR_URL}${trrId}/`,
  [TRR_REQUEST_START, TRR_REQUEST_SUCCESS, TRR_REQUEST_FAILURE]
)());

export const requestDocument = ({ id, email }) => post(
  `${TRR_URL}${id}/request-document/`,
  [TRR_REQUEST_DOC_REQUEST_START, TRR_REQUEST_DOC_REQUEST_SUCCESS, TRR_REQUEST_DOC_REQUEST_FAILURE]
)({ email: email });

export const turnOnNoAttachmentTextEditMode = createChangeEditModeAction(TRR_EDIT_MODE)(
  TRR_EDIT_TYPES.NO_ATTACHMENT_TEXT, true
);
export const turnOffNoAttachmentTextEditMode = createChangeEditModeAction(TRR_EDIT_MODE)(
  TRR_EDIT_TYPES.NO_ATTACHMENT_TEXT, false
);

export const turnOnDocumentRequestInstructionEditMode = createChangeEditModeAction(TRR_EDIT_MODE)(
  TRR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION, true
);
export const turnOffDocumentRequestInstructionEditMode = createChangeEditModeAction(TRR_EDIT_MODE)(
  TRR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION, false
);
