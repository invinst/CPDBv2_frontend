import Cookies from 'js-cookie';
import { stub } from 'sinon';

import { fetchDocumentsByCRID, setDocumentShow } from 'actions/document-deduplicator-page';
import * as constants from 'utils/constants';


describe('document decuplicator page actions', function () {
  describe('fetchDocumentsByCRID', function () {
    it('should return correct action', function () {
      stub(Cookies, 'get').returns('authenticated_token');
      fetchDocumentsByCRID({ crid: 1 }).should.deepEqual({
        types: [
          constants.DOCUMENT_DEDUPLICATOR_REQUEST_START,
          constants.DOCUMENT_DEDUPLICATOR_REQUEST_SUCCESS,
          constants.DOCUMENT_DEDUPLICATOR_REQUEST_FAILURE],
        payload: {
          request: {
            url: constants.DOCUMENTS_URL,
            params: { crid: 1, limit: undefined, offset: undefined },
            adapter: null,
            cancelToken: undefined,
            headers: {
              Authorization: 'Token authenticated_token',
            },
          },
        },
      });
    });
  });

  describe('setDocumentShow', function () {
    it('should return correct action', function () {
      stub(Cookies, 'get').returns('authenticated_token');
      setDocumentShow(3001, true).should.deepEqual({
        types: [
          constants.DOCUMENT_VISIBILITY_TOGGLE_REQUEST_START,
          constants.DOCUMENT_VISIBILITY_TOGGLE_REQUEST_SUCCESS,
          constants.DOCUMENT_VISIBILITY_TOGGLE_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${constants.DOCUMENTS_URL}3001/`,
            data: { show: true },
            adapter: null,
            method: 'patch',
            headers: {
              Authorization: 'Token authenticated_token',
            },
          },
        },
      });
    });
  });
});
