import { CancelToken } from 'axios';
import { stub, spy } from 'sinon';

import { fetchDocuments, searchDocuments } from 'actions/documents-overview-page';
import * as constants from 'utils/constants';


describe('documents overview page actions', function () {
  let cancel;

  beforeEach(function () {
    cancel = spy();
    stub(CancelToken, 'source').returns({
      token: 'token',
      cancel
    });
  });

  afterEach(function () {
    CancelToken.source.restore();
  });

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
            adapter: null,
            cancelToken: 'token'
          }
        }
      });
    });

    it('should cancel old request if new request is called', function () {
      fetchDocuments();
      fetchDocuments();
      cancel.called.should.be.true();
    });
  });

  describe('searchDocuments', function () {
    it('should return correct action', function () {
      searchDocuments('term').should.deepEqual({
        types: [
          constants.DOCUMENT_OVERVIEW_SEARCH_REQUEST_START,
          constants.DOCUMENT_OVERVIEW_SEARCH_REQUEST_SUCCESS,
          constants.DOCUMENT_OVERVIEW_SEARCH_REQUEST_FAILURE
        ],
        payload: {
          request: {
            url: constants.DOCUMENTS_URL,
            params: {
              match: 'term'
            },
            adapter: null,
            cancelToken: 'token'
          }
        }
      });
    });

    it('should cancel old request if new request is called', function () {
      searchDocuments('term');
      searchDocuments('term');
      cancel.called.should.be.true();
    });
  });
});
