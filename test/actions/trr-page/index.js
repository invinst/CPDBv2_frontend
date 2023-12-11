import {
  fetchTRR,
  requestDocument,
  turnOffNoAttachmentTextEditMode,
  turnOnNoAttachmentTextEditMode,
  turnOnDocumentRequestInstructionEditMode,
  turnOffDocumentRequestInstructionEditMode,
} from 'actions/trr-page';
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


describe('TRRPage actions', function () {
  describe('fetchTRR', function () {
    it('should return the right action', function () {
      fetchTRR(123).should.eql({
        types: [TRR_REQUEST_START, TRR_REQUEST_SUCCESS, TRR_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${TRR_URL}123/`,
            params: undefined,
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('requestDocument', function () {
    it('should return right action', function () {
      requestDocument({ id: 123, email: 'valid@email.com' }).should.eql({
        types: [TRR_REQUEST_DOC_REQUEST_START, TRR_REQUEST_DOC_REQUEST_SUCCESS, TRR_REQUEST_DOC_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${TRR_URL}123/request-document/`,
            data: {
              email: 'valid@email.com',
            },
            method: 'post',
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('turnOnNoAttachmentTextEditMode action', function () {
    it('should return correct action', function () {
      turnOnNoAttachmentTextEditMode().should.eql({
        type: TRR_EDIT_MODE,
        payload: { editType: TRR_EDIT_TYPES.NO_ATTACHMENT_TEXT, mode: true },
      });
    });
  });

  describe('turnOffTriangleExplainEditMode action', function () {
    it('should return correct action', function () {
      turnOffNoAttachmentTextEditMode().should.eql({
        type: TRR_EDIT_MODE,
        payload: { editType: TRR_EDIT_TYPES.NO_ATTACHMENT_TEXT, mode: false },
      });
    });
  });

  describe('turnOnDocumentRequestInstructionEditMode action', function () {
    it('should return correct action', function () {
      turnOnDocumentRequestInstructionEditMode().should.eql({
        type: TRR_EDIT_MODE,
        payload: { editType: TRR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION, mode: true },
      });
    });
  });

  describe('turnOffDocumentRequestInstructionEditMode action', function () {
    it('should return correct action', function () {
      turnOffDocumentRequestInstructionEditMode().should.eql({
        type: TRR_EDIT_MODE,
        payload: { editType: TRR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION, mode: false },
      });
    });
  });
});
