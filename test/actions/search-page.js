import {
  getSuggestion, selectTag, toggleSearchMode, trackRecentSuggestion,
  SUGGESTION_URL, SELECT_TAG, SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS,
  SUGGESTION_REQUEST_FAILURE, TRACK_RECENT_SUGGESTION, SEARCH_NAVIGATION_UP,
  SEARCH_NAVIGATION_DOWN, SEARCH_NAVIGATION_LEFT, SEARCH_NAVIGATION_RIGHT, move
} from 'actions/search-page';
import { OPEN_SEARCH_PAGE } from 'utils/constants';


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
        type: OPEN_SEARCH_PAGE,
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
      move('up', 'suggestionColumns').should.deepEqual({
        type: SEARCH_NAVIGATION_UP,
        payload: {
          suggestionColumns: 'suggestionColumns'
        }
      });
    });

    it('should return SEARCH_NAVIGATION_DOWN', function () {
      move('down', 'suggestionColumns').should.deepEqual({
        type: SEARCH_NAVIGATION_DOWN,
        payload: {
          suggestionColumns: 'suggestionColumns'
        }
      });
    });

    it('should return SEARCH_NAVIGATION_LEFT', function () {
      move('left', 'suggestionColumns').should.deepEqual({
        type: SEARCH_NAVIGATION_LEFT,
        payload: {
          suggestionColumns: 'suggestionColumns'
        }
      });
    });

    it('should return SEARCH_NAVIGATION_RIGHT', function () {
      move('right', 'suggestionColumns').should.deepEqual({
        type: SEARCH_NAVIGATION_RIGHT,
        payload: {
          suggestionColumns: 'suggestionColumns'
        }
      });
    });
  });
});
