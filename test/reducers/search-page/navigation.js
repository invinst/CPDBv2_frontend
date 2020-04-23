import navigation from 'reducers/search-page/navigation';
import {
  SEARCH_NAVIGATION_DOWN,
  SEARCH_NAVIGATION_UP,
  SEARCH_NAVIGATION_RESET,
  SEARCH_NAVIGATION_SET,
} from 'utils/constants';


describe('navigation reducer', function () {
  describe('SEARCH_NAVIGATION_RESET', function () {
    it('resets to first position by default', function () {
      navigation({ 'itemIndex': 2 }, {
        type: SEARCH_NAVIGATION_RESET,
        payload: undefined,
      }).should.deepEqual({ 'itemIndex': 1 });
    });

    it('resets to a position', function () {
      navigation({ 'itemIndex': 2 }, {
        type: SEARCH_NAVIGATION_RESET,
        payload: 3,
      }).should.deepEqual({ 'itemIndex': 3 });
    });
  });

  describe('SEARCH_NAVIGATION_DOWN', function () {
    it('stays in the same position if it\'s the last one', function () {
      navigation({ 'itemIndex': 1 }, {
        type: SEARCH_NAVIGATION_DOWN,
        payload: {
          totalItemCount: 2,
        },
      }).should.deepEqual({ 'itemIndex': 1 });
    });

    it('moves down one row in the normal case', function () {
      navigation({ 'itemIndex': 0 }, {
        type: SEARCH_NAVIGATION_DOWN,
        payload: {
          totalItemCount: 2,
        },
      }).should.deepEqual({ 'itemIndex': 1 });
    });
  });

  describe('SEARCH_NAVIGATION_UP', function () {
    it('stays in the same position if it\'s in the search box', function () {
      navigation({ 'itemIndex': -1 }, {
        type: SEARCH_NAVIGATION_UP,
        payload: {
          totalItemCount: 2,
        },
      }).should.deepEqual({ 'itemIndex': -1 });
    });

    it('moves up one row in normal case', function () {
      navigation({ 'itemIndex': 1 }, {
        type: SEARCH_NAVIGATION_UP,
        payload: {
          totalItemCount: 2,
        },
      }).should.deepEqual({ 'itemIndex': 0 });
    });
  });

  describe('SEARCH_NAVIGATION_SET', function () {
    navigation(undefined, {
      type: SEARCH_NAVIGATION_SET,
      payload: {
        itemIndex: 1,
      },
    }).should.eql({ itemIndex: 1 });
  });
});
