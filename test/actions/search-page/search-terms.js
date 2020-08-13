import { requestSearchTermCategories, move, resetNavigation, setNavigation } from 'actions/search-page/search-terms';
import {
  SEARCH_TERMS_CATEGORIES_REQUEST_START,
  SEARCH_TERMS_CATEGORIES_REQUEST_SUCCESS,
  SEARCH_TERMS_CATEGORIES_REQUEST_FAILURE,
  SEARCH_TERMS_CATEGORIES_API_URL,
  SEARCH_TERMS_NAVIGATION_UP,
  SEARCH_TERMS_NAVIGATION_DOWN,
  SEARCH_TERMS_NAVIGATION_RESET,
  SEARCH_TERMS_NAVIGATION_SET,
} from 'utils/constants';


describe('search terms actions', function () {
  describe('requestSearchTermCategories', function () {
    it('should return correct action', function () {
      requestSearchTermCategories().should.deepEqual({
        types: [
          SEARCH_TERMS_CATEGORIES_REQUEST_START,
          SEARCH_TERMS_CATEGORIES_REQUEST_SUCCESS,
          SEARCH_TERMS_CATEGORIES_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: SEARCH_TERMS_CATEGORIES_API_URL,
            params: undefined,
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('move', function () {
    it('should return SEARCH_NAVIGATION_UP', function () {
      move('up', 2).should.deepEqual({
        type: SEARCH_TERMS_NAVIGATION_UP,
        payload: {
          totalItemCount: 2,
        },
      });
    });

    it('should return SEARCH_NAVIGATION_DOWN', function () {
      move('down', 2).should.deepEqual({
        type: SEARCH_TERMS_NAVIGATION_DOWN,
        payload: {
          totalItemCount: 2,
        },
      });
    });
  });

  describe('resetNavigation', function () {
    it('should return SEARCH_TERMS_NAVIGATION_RESET', function () {
      resetNavigation().should.deepEqual({
        type: SEARCH_TERMS_NAVIGATION_RESET,
        payload: undefined,
      });
    });
  });

  describe('setNavigation', function () {
    it('should return SEARCH_TERMS_NAVIGATION_SET', function () {
      const uniqueKey = 'some-key';
      const navigationKeys = ['key-1', 'key-2', uniqueKey];
      setNavigation({ navigationKeys, uniqueKey }).should.deepEqual({
        type: SEARCH_TERMS_NAVIGATION_SET,
        payload: { navigationKeys, uniqueKey },
      });
    });
  });
});
