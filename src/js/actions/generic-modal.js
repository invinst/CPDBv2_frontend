import { createAction } from 'redux-actions';

export const OPEN_REQUEST_DOCUMENT_MODAL = 'OPEN_REQUEST_DOCUMENT_MODAL';
export const OPEN_REQUEST_TRR_DOCUMENT_MODAL = 'OPEN_REQUEST_TRR_DOCUMENT_MODAL';
export const OPEN_LEGAL_DISCLAIMER_MODAL = 'OPEN_LEGAL_DISCLAIMER_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openRequestDocumentModal = createAction(OPEN_REQUEST_DOCUMENT_MODAL);
export const openRequestTRRDocumentModal = createAction(OPEN_REQUEST_TRR_DOCUMENT_MODAL);
export const openLegalDisclaimerModal = createAction(OPEN_LEGAL_DISCLAIMER_MODAL);
export const closeModal = createAction(CLOSE_MODAL);
