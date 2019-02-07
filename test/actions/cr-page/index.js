import {
  fetchCR,
  requestDocument,
  turnOnNoAttachmentTextEditMode,
  turnOffNoAttachmentTextEditMode,
  turnOnDocumentRequestInstructionEditMode,
  turnOffDocumentRequestInstructionEditMode,
  turnOnNewDocumentNotificationEditMode,
  turnOffNewDocumentNotificationEditMode,
} from 'actions/cr-page';
import {
  CR_URL,
  CR_REQUEST_START,
  CR_REQUEST_SUCCESS,
  CR_REQUEST_FAILURE,
  CR_REQUEST_DOC_START,
  CR_REQUEST_DOC_SUCCESS,
  CR_REQUEST_DOC_FAILURE,
  CR_EDIT_MODE,
  CR_EDIT_TYPES
} from 'utils/constants';


describe('CRPage actions', function () {
  describe('fetchCR', function () {
    it('should return the right action', function () {
      fetchCR(123).should.eql({
        types: [CR_REQUEST_START, CR_REQUEST_SUCCESS, CR_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${CR_URL}123/`,
            params: undefined,
            adapter: null
          }
        }
      });
    });
  });

  describe('requestDocument', function () {
    it('shoulr return right action', function () {
      requestDocument({ id: 123, email: 'valid@email.com' }).should.eql({
        types: [CR_REQUEST_DOC_START, CR_REQUEST_DOC_SUCCESS, CR_REQUEST_DOC_FAILURE],
        payload: {
          request: {
            url: `${CR_URL}123/request-document/`,
            data: {
              email: 'valid@email.com'
            },
            method: 'post',
            adapter: null
          }
        }
      });
    });
  });

  describe('turnOnNoAttachmentTextEditMode action', function () {
    it('should return correct action', function () {
      turnOnNoAttachmentTextEditMode().should.eql({
        type: CR_EDIT_MODE,
        payload: { editType: CR_EDIT_TYPES.NO_ATTACHMENT_TEXT, mode: true }
      });
    });
  });

  describe('turnOffNoAttachmentTextEditMode action', function () {
    it('should return correct action', function () {
      turnOffNoAttachmentTextEditMode().should.eql({
        type: CR_EDIT_MODE,
        payload: { editType: CR_EDIT_TYPES.NO_ATTACHMENT_TEXT, mode: false }
      });
    });
  });

  describe('turnOnDocumentRequestInstructionEditMode action', function () {
    it('should return correct action', function () {
      turnOnDocumentRequestInstructionEditMode().should.eql({
        type: CR_EDIT_MODE,
        payload: { editType: CR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION, mode: true }
      });
    });
  });

  describe('turnOffDocumentRequestInstructionEditMode action', function () {
    it('should return correct action', function () {
      turnOffDocumentRequestInstructionEditMode().should.eql({
        type: CR_EDIT_MODE,
        payload: { editType: CR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION, mode: false }
      });
    });
  });

  describe('turnOnNewDocumentNotificationEditMode action', function () {
    it('should return correct action', function () {
      turnOnNewDocumentNotificationEditMode().should.eql({
        type: CR_EDIT_MODE,
        payload: { editType: CR_EDIT_TYPES.NEW_DOCUMENT_NOTIFICATIONS, mode: true }
      });
    });
  });

  describe('turnOffNewDocumentNotificationEditMode action', function () {
    it('should return correct action', function () {
      turnOffNewDocumentNotificationEditMode().should.eql({
        type: CR_EDIT_MODE,
        payload: { editType: CR_EDIT_TYPES.NEW_DOCUMENT_NOTIFICATIONS, mode: false }
      });
    });
  });
});
