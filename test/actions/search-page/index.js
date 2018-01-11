import {
  getSuggestion, selectTag, toggleSearchMode, trackRecentSuggestion,
  SUGGESTION_URL, SELECT_TAG, SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS,
  SUGGESTION_REQUEST_FAILURE, TRACK_RECENT_SUGGESTION, SEARCH_NAVIGATION_UP,
  SEARCH_NAVIGATION_DOWN, move, getSuggestionWithContentType
} from 'actions/search-page';
import * as constants from 'utils/constants';


describe('suggestion action', function () {
  describe('getSuggestion', function () {
    it('should return correct action', function () {
      getSuggestion('abc', {
        contentType: 'xyz'
      }).should.deepEqual({
        types: [SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${SUGGESTION_URL}abc/`,
            params: {
              contentType: 'xyz'
            },
            adapter: null
          }
        }
      });
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
          constants.SUGGESTION_SINGLE_REQUEST_FAILURE
        ],
        payload: {
          request: {
            url: `${SUGGESTION_URL}abc/single/`,
            params: {
              contentType: 'xyz'
            },
            adapter: null
          }
        }
      });
    });
  });

  describe('selectTag', function () {
    it('should return correct action', function () {
      selectTag('abc').should.deepEqual({
        type: SELECT_TAG,
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
        type: TRACK_RECENT_SUGGESTION,
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
        type: SEARCH_NAVIGATION_UP,
        payload: {
          totalItemCount: 2
        }
      });
    });

    it('should return SEARCH_NAVIGATION_DOWN', function () {
      move('down', 2).should.deepEqual({
        type: SEARCH_NAVIGATION_DOWN,
        payload: {
          totalItemCount: 2
        }
      });
    });
  });
});
