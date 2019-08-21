import {
  fetchDocument,
  turnOnDocumentPageTitleEditMode,
  turnOffDocumentPageTitleEditMode,
  turnOnDocumentTextContentEditMode,
  turnOffDocumentTextContentEditMode,
  updateDocument,
} from 'actions/document-page';
import {
  DOCUMENTS_URL,
  DOCUMENT_REQUEST_START,
  DOCUMENT_REQUEST_SUCCESS,
  DOCUMENT_REQUEST_FAILURE,
  TURN_ON_DOCUMENT_TITLE_EDIT_MODE,
  UPDATE_DOCUMENT_PAGE_REQUEST_START,
  UPDATE_DOCUMENT_PAGE_REQUEST_SUCCESS,
  UPDATE_DOCUMENT_PAGE_REQUEST_FAILURE,
  TURN_OFF_DOCUMENT_TITLE_EDIT_MODE,
  TURN_ON_DOCUMENT_TEXT_CONTENT_EDIT_MODE,
  TURN_OFF_DOCUMENT_TEXT_CONTENT_EDIT_MODE,
} from 'utils/constants';


describe('DocumentPage actions', function () {
  describe('fetchDocument', function () {
    it('should return the right action', function () {
      fetchDocument(123).should.eql({
        types: [DOCUMENT_REQUEST_START, DOCUMENT_REQUEST_SUCCESS, DOCUMENT_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${ DOCUMENTS_URL }123/`,
            params: undefined,
            adapter: null,
            headers: {},
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('updateDocument', function () {
    it('should return right action', function () {
      updateDocument({
        fields: [
          { type: 'number', key: 'id', value: 123 },
          { type: 'string', key: 'title', value: 'new title' },
        ],
      }).should.eql({
        types: [
          UPDATE_DOCUMENT_PAGE_REQUEST_START,
          UPDATE_DOCUMENT_PAGE_REQUEST_SUCCESS,
          UPDATE_DOCUMENT_PAGE_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${ DOCUMENTS_URL }123/`,
            data: {
              title: 'new title',
              id: 123,
            },
            method: 'patch',
            adapter: null,
            headers: {},
          },
        },
      });
    });
  });

  describe('turnOnDocumentPageTitleEditMode action', function () {
    it('should return correct action', function () {
      turnOnDocumentPageTitleEditMode().should.eql({
        type: TURN_ON_DOCUMENT_TITLE_EDIT_MODE,
        payload: undefined,
      });
    });
  });

  describe('turnOffDocumentPageTitleEditMode action', function () {
    it('should return correct action', function () {
      turnOffDocumentPageTitleEditMode().should.eql({
        type: TURN_OFF_DOCUMENT_TITLE_EDIT_MODE,
        payload: undefined,
      });
    });
  });

  describe('turnOnDocumentTextContentEditMode action', function () {
    it('should return correct action', function () {
      turnOnDocumentTextContentEditMode().should.eql({
        type: TURN_ON_DOCUMENT_TEXT_CONTENT_EDIT_MODE,
        payload: undefined,
      });
    });
  });

  describe('turnOffDocumentTextContentEditMode action', function () {
    it('should return correct action', function () {
      turnOffDocumentTextContentEditMode().should.eql({
        type: TURN_OFF_DOCUMENT_TEXT_CONTENT_EDIT_MODE,
        payload: undefined,
      });
    });
  });
});
