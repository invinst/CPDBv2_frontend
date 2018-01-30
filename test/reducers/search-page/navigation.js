import navigation from 'reducers/search-page/navigation';
import {
  SEARCH_NAVIGATION_DOWN, SEARCH_NAVIGATION_UP, SEARCH_NAVIGATION_RESET,
  CHANGE_SEARCH_QUERY
} from 'actions/search-page';


describe('navigation reducer', function () {
  describe('SEARCH_NAVIGATION_RESET', function () {
    it('resets to first position', function () {
      navigation({ 'itemIndex': 2 }, {
        type: SEARCH_NAVIGATION_RESET,
        payload: {}
      }).should.deepEqual({ 'itemIndex': 1 });
    });
  });

  describe('CHANGE_SEARCH_QUERY', function () {
    it('resets to search box position', function () {
      navigation({ 'itemIndex': 2 }, {
        type: CHANGE_SEARCH_QUERY,
        payload: {}
      }).should.deepEqual({ 'itemIndex': 0 });
    });
  });

  describe('SEARCH_NAVIGATION_DOWN', function () {
    it('stays in the same position if it\'s the last one', function () {
      navigation({ 'itemIndex': 1 }, {
        type: SEARCH_NAVIGATION_DOWN,
        payload: {
          totalItemCount: 2
        }
      }).should.deepEqual({ 'itemIndex': 1 });
    });

    it('moves down one row in the normal case', function () {
      navigation({ 'itemIndex': 0 }, {
        type: SEARCH_NAVIGATION_DOWN,
        payload: {
          totalItemCount: 2
        }
      }).should.deepEqual({ 'itemIndex': 1 });
    });
  });

  describe('SEARCH_NAVIGATION_UP', function () {
    it('stays in the same position if it\'s in the search box', function () {
      navigation({ 'itemIndex': -1 }, {
        type: SEARCH_NAVIGATION_UP,
        payload: {
          totalItemCount: 2
        }
      }).should.deepEqual({ 'itemIndex': -1 });
    });

    it('moves up one row in normal case', function () {
      navigation({ 'itemIndex': 1 }, {
        type: SEARCH_NAVIGATION_UP,
        payload: {
          totalItemCount: 2
        }
      }).should.deepEqual({ 'itemIndex': 0 });
    });
  });
});
