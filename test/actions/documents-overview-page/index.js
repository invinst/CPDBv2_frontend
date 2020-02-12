import Cookies from 'js-cookie';
import { CancelToken } from 'axios';
import { spy, stub } from 'sinon';

import { fetchDocuments, fetchDocumentsAuthenticated } from 'actions/documents-overview-page';
import * as constants from 'utils/constants';


describe('documents overview page actions', function () {
  let cancel;

  beforeEach(function () {
    cancel = spy();
    stub(CancelToken, 'source').returns({
      token: 'token',
      cancel,
    });
  });

  describe('fetchDocuments', function () {
    it('should return correct action', function () {
      fetchDocuments().should.deepEqual({
        types: [
          constants.DOCUMENT_OVERVIEW_REQUEST_START,
          constants.DOCUMENT_OVERVIEW_REQUEST_SUCCESS,
          constants.DOCUMENT_OVERVIEW_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: constants.DOCUMENTS_URL,
            params: {},
            adapter: null,
            cancelToken: 'token',
          },
        },
      });
    });

    it('should accept params', function () {
      fetchDocuments({ match: '1001' }).should.deepEqual({
        types: [
          constants.DOCUMENT_OVERVIEW_REQUEST_START,
          constants.DOCUMENT_OVERVIEW_REQUEST_SUCCESS,
          constants.DOCUMENT_OVERVIEW_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: constants.DOCUMENTS_URL,
            params: {
              match: '1001',
            },
            adapter: null,
            cancelToken: 'token',
          },
        },
      });
    });

    it('should cancel old request if new request is called', function () {
      fetchDocuments();
      fetchDocuments();
      cancel.called.should.be.true();
    });
  });

  describe('fetchDocumentsAuthenticated', function () {
    it('should return correct action', function () {
      stub(Cookies, 'get').returns('authenticated_token');
      fetchDocumentsAuthenticated().should.deepEqual({
        types: [
          constants.DOCUMENT_OVERVIEW_REQUEST_START,
          constants.DOCUMENT_OVERVIEW_REQUEST_SUCCESS,
          constants.DOCUMENT_OVERVIEW_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: constants.DOCUMENTS_URL,
            params: {
              authenticated: true,
            },
            adapter: null,
            cancelToken: 'token',
            headers: {
              Authorization: 'Token authenticated_token',
            },
          },
        },
      });
    });

    it('should accept params', function () {
      stub(Cookies, 'get').returns('authenticated_token');
      fetchDocumentsAuthenticated({ match: '1001' }).should.deepEqual({
        types: [
          constants.DOCUMENT_OVERVIEW_REQUEST_START,
          constants.DOCUMENT_OVERVIEW_REQUEST_SUCCESS,
          constants.DOCUMENT_OVERVIEW_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: constants.DOCUMENTS_URL,
            params: {
              match: '1001',
              authenticated: true,
            },
            adapter: null,
            cancelToken: 'token',
            headers: {
              Authorization: 'Token authenticated_token',
            },
          },
        },
      });
    });

    it('should cancel old request if new request is called', function () {
      fetchDocumentsAuthenticated();
      fetchDocumentsAuthenticated();
      cancel.called.should.be.true();
    });
  });
});
