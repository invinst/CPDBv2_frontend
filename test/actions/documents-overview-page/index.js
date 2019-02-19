import { fetchDocuments } from 'actions/documents-overview-page';
import * as constants from 'utils/constants';


describe('documents overview page actions', function () {
  describe('fetchDocuments', function () {
    it('should return correct action', function () {
      fetchDocuments().should.deepEqual({
        types: [
          constants.DOCUMENT_OVERVIEW_REQUEST_START,
          constants.DOCUMENT_OVERVIEW_REQUEST_SUCCESS,
          constants.DOCUMENT_OVERVIEW_REQUEST_FAILURE
        ],
        payload: {
          request: {
            url: constants.DOCUMENTS_URL,
            params: {},
            adapter: null
          }
        }
      });
    });
  });
});
