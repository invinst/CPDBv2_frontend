import { CancelToken } from 'axios';
import { stub, spy } from 'sinon';

import { fetchDocuments } from 'actions/documents-overview-page';
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

    it('should accept params', function () {
      fetchDocuments({ match: '1001' }).should.deepEqual({
        types: [
          constants.DOCUMENT_OVERVIEW_REQUEST_START,
          constants.DOCUMENT_OVERVIEW_REQUEST_SUCCESS,
          constants.DOCUMENT_OVERVIEW_REQUEST_FAILURE
        ],
        payload: {
          request: {
            url: constants.DOCUMENTS_URL,
            params: {
              match: '1001'
            },
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
});
