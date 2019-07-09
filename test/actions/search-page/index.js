import { stub, spy } from 'sinon';
import { CancelToken } from 'axios';

import {
  getSuggestion, selectTag, toggleSearchMode, trackRecentSuggestion,
  move, getSuggestionWithContentType, SUGGESTION_URL
} from 'actions/search-page';
import * as constants from 'utils/constants';
import { resetNavigation } from 'actions/search-page';


describe('suggestion action', function () {
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

  describe('getSuggestion', function () {
    it('should return correct action', function () {
      getSuggestion('abc').should.deepEqual({
        types: [
          constants.SUGGESTION_REQUEST_START,
          constants.SUGGESTION_REQUEST_SUCCESS,
          constants.SUGGESTION_REQUEST_FAILURE,
          constants.SUGGESTION_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: SUGGESTION_URL,
            params: { term: 'abc' },
            adapter: null,
            cancelToken: 'token'
          }
        }
      });
    });

    it('should cancel old request if new request is called', function () {
      getSuggestion('abc');
      getSuggestion('def');
      cancel.called.should.be.true();
    });
  });

  describe('getSuggestionWithContentType', function () {
    it('should return correct action', function () {
      getSuggestionWithContentType('abc', {
        contentType: 'xyz'
      }).should.deepEqual({
        types: [
          constants.SUGGESTION_SINGLE_REQUEST_START,
          constants.SUGGESTION_SINGLE_REQUEST_SUCCESS,
          constants.SUGGESTION_SINGLE_REQUEST_FAILURE,
          constants.SUGGESTION_SINGLE_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: `${SUGGESTION_URL}single/`,
            params: {
              contentType: 'xyz',
              term: 'abc'
            },
            adapter: null,
            cancelToken: 'token'
          }
        }
      });
    });
  });

  describe('selectTag', function () {
    it('should return correct action', function () {
      selectTag('abc').should.deepEqual({
        type: constants.SELECT_TAG,
        payload: 'abc'
      });
    });
  });

  describe('toggleSearchMode', function () {
    it('should return correct action', function () {
      toggleSearchMode().should.deepEqual({
        type: constants.OPEN_SEARCH_PAGE,
        payload: undefined
      });
    });
  });

  describe('trackRecentSuggestion', function () {
    it('should return correct action', function () {
      const contentType = 'contentType';
      const text = 'text';
      const url = 'url';
      const to = 'to';

      trackRecentSuggestion(contentType, text, url, to).should.deepEqual({
        type: constants.TRACK_RECENT_SUGGESTION,
        payload: {
          contentType,
          text,
          url,
          to
        }
      });
    });
  });

  describe('move', function () {
    it('should return SEARCH_NAVIGATION_UP', function () {
      move('up', 2).should.deepEqual({
        type: constants.SEARCH_NAVIGATION_UP,
        payload: {
          totalItemCount: 2
        }
      });
    });

    it('should return SEARCH_NAVIGATION_DOWN', function () {
      move('down', 2).should.deepEqual({
        type: constants.SEARCH_NAVIGATION_DOWN,
        payload: {
          totalItemCount: 2
        }
      });
    });
  });

  describe('resetNavigation', function () {
    it('should return SEARCH_NAVIGATION_RESET', function () {
      resetNavigation().should.deepEqual({
        type: constants.SEARCH_NAVIGATION_RESET,
        payload: undefined
      });
    });
  });
});
