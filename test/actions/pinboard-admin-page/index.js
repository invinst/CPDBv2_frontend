import Cookies from 'js-cookie';
import { CancelToken } from 'axios';
import { spy, stub } from 'sinon';

import {
  fetchAllPinboards,
  fetchPinboardStaticSocialGraph,
  clearPinboardStaticSocialGraphCache,
} from 'actions/pinboard-admin-page';
import {
  ALL_PINBOARD_REQUEST_FAILURE,
  ALL_PINBOARD_REQUEST_START,
  ALL_PINBOARD_REQUEST_SUCCESS,
  ALL_PINBOARD_URL,
  PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_START,
  PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS,
  PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_FAILURE,
  SOCIAL_GRAPH_NETWORK_API_URL,
  CLEAR_PINBOARD_STATIC_SOCIAL_GRAPH_CACHE,
} from 'utils/constants';


describe('pinboard admin page actions', function () {
  describe('fetchAllPinboards', function () {
    it('should return correct payload', function () {
      let cancel;
      cancel = spy();
      stub(CancelToken, 'source').returns({
        token: 'token',
        cancel,
      });

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
            cancelToken: 'token',
            headers: {
              Authorization: 'Token authenticated_token',
            },
          },
        },
      });
    });
  });

  describe('fetchPinboardStaticSocialGraph', function () {
    it('should return correct action', function () {
      fetchPinboardStaticSocialGraph('268a5e58').should.deepEqual({
        types: [
          PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_START,
          PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS,
          PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: SOCIAL_GRAPH_NETWORK_API_URL,
            params: { 'pinboard_id': '268a5e58', static: true },
            adapter: null,
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('clearPinboardStaticSocialGraphCache', function () {
    it('should return correct action', function () {
      clearPinboardStaticSocialGraphCache().should.eql({
        type: CLEAR_PINBOARD_STATIC_SOCIAL_GRAPH_CACHE,
        payload: undefined,
      });
    });
  });
});
