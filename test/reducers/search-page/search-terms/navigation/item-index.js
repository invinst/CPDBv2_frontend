import itemIndex from 'reducers/search-page/search-terms/navigation/item-index';
import {
  SEARCH_TERMS_NAVIGATION_DOWN,
  SEARCH_TERMS_NAVIGATION_RESET,
  SEARCH_TERMS_NAVIGATION_SET,
  SEARCH_TERMS_NAVIGATION_UP,
} from 'utils/constants';


describe('itemIndex reducer', function () {
  describe('SEARCH_TERMS_NAVIGATION_RESET', function () {
    it('resets to first position', function () {
      itemIndex( 2, {
        type: SEARCH_TERMS_NAVIGATION_RESET,
        payload: {}
      }).should.deepEqual(1);
    });
  });

  describe('SEARCH_TERMS_NAVIGATION_DOWN', function () {
    it('stays in the same position if it\'s the last one', function () {
      itemIndex(1, {
        type: SEARCH_TERMS_NAVIGATION_DOWN,
        payload: {
          totalItemCount: 2
        }
      }).should.deepEqual(1);
    });

    it('moves down one row in the normal case', function () {
      itemIndex(0, {
        type: SEARCH_TERMS_NAVIGATION_DOWN,
        payload: {
          totalItemCount: 2
        }
      }).should.deepEqual(1);
    });
  });

  describe('SEARCH_TERMS_NAVIGATION_UP', function () {
    it('stays in the same position if it\'s in the search box', function () {
      itemIndex(-1, {
        type: SEARCH_TERMS_NAVIGATION_UP,
        payload: {
          totalItemCount: 2
        }
      }).should.deepEqual(-1);
    });

    it('moves up one row in normal case', function () {
      itemIndex( 1, {
        type: SEARCH_TERMS_NAVIGATION_UP,
        payload: {
          totalItemCount: 2
        }
      }).should.deepEqual(0);
    });
  });

  describe('SEARCH_TERMS_NAVIGATION_SET', function () {
    it('set the index of the uniqueKey', function () {
      const uniqueKey = 'some-key';
      const navigationKeys = ['key-1', 'key-2', uniqueKey];
      itemIndex(1, {
        type: SEARCH_TERMS_NAVIGATION_SET,
        payload: { navigationKeys, uniqueKey }
      }).should.deepEqual(2);
    });
  });
});
