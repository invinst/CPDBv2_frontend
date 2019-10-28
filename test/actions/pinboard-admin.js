import Cookies from 'js-cookie';
import { stub } from 'sinon';

import { fetchAllPinboards } from 'actions/pinboard-admin';
import {
  ALL_PINBOARD_REQUEST_FAILURE,
  ALL_PINBOARD_REQUEST_START,
  ALL_PINBOARD_REQUEST_SUCCESS,
  ALL_PINBOARD_URL,
} from 'utils/constants';


describe('pinboard admin page actions', function () {
  describe('fetchAllPinboards', function () {
    it('should return correct payload', function () {
      const params = { limit: '100' };
      stub(Cookies, 'get').returns('authenticated_token');

      fetchAllPinboards(params).should.eql({
        types: [
          ALL_PINBOARD_REQUEST_START,
          ALL_PINBOARD_REQUEST_SUCCESS,
          ALL_PINBOARD_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: ALL_PINBOARD_URL,
            params,
            adapter: null,
            cancelToken: undefined,
            headers: {
              Authorization: 'Token authenticated_token',
            },
          },
        },
      });
      Cookies.get.restore();
    });
  });
});
