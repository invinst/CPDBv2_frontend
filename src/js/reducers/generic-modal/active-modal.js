import { handleActions } from 'redux-actions';
import {
  OPEN_REQUEST_DOCUMENT_MODAL,
  OPEN_REQUEST_TRR_DOCUMENT_MODAL,
  CLOSE_MODAL,
  OPEN_LEGAL_DISCLAIMER_MODAL
} from 'actions/generic-modal';

const activeModal = handleActions({
  [OPEN_REQUEST_DOCUMENT_MODAL]: () => 'REQUEST_DOCUMENT',
  [OPEN_REQUEST_TRR_DOCUMENT_MODAL]: () => 'REQUEST_TRR_DOCUMENT',
  [OPEN_LEGAL_DISCLAIMER_MODAL]: () => 'LEGAL_DISCLAIMER',
  [CLOSE_MODAL]: () => null
}, null);

export default activeModal;
