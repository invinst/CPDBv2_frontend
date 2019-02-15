import Cookies from 'js-cookie';
import { stub } from 'sinon';

import { fetchTrackerDocuments, setDocumentShow } from 'actions/tracker/documents-page';
import * as constants from 'utils/constants';

describe('documents page actions', function () {
  describe('fetchTrackerDocuments', function () {
    it('should return correct action', function () {
      fetchTrackerDocuments({ offset: 20 }).should.deepEqual({
        types: [
          constants.TRACKER_DOCUMENTS_REQUEST_START,
          constants.TRACKER_DOCUMENTS_REQUEST_SUCCESS,
          constants.TRACKER_DOCUMENTS_REQUEST_FAILURE],
        payload: {
          request: {
            url: constants.TRACKER_DOCUMENTS_URL,
            params: { offset: 20 },
            adapter: null
          }
        }
      });
    });
  });

  describe('setDocumentShow', function () {
    it('should return correct action', function () {
      stub(Cookies, 'get').returns('authenticated_token');
      setDocumentShow(3001, true).should.deepEqual({
        types: [
          constants.TRACKER_DOCUMENTS_TOGGLE_SHOW_REQUEST_START,
          constants.TRACKER_DOCUMENTS_TOGGLE_SHOW_REQUEST_SUCCESS,
          constants.TRACKER_DOCUMENTS_TOGGLE_SHOW_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${constants.TRACKER_DOCUMENTS_URL}3001/`,
            data: { show: true },
            adapter: null,
            method: 'patch',
            headers: {
              Authorization: 'Token authenticated_token'
            }
          }
        }
      });
      Cookies.get.restore();
    });
  });
});
