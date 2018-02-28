import scrollTo from 'reducers/search-page/search-terms/navigation/scroll-to';
import {
  SEARCH_TERMS_NAVIGATION_DOWN,
  SEARCH_TERMS_NAVIGATION_RESET,
  SEARCH_TERMS_NAVIGATION_SET,
  SEARCH_TERMS_NAVIGATION_UP,
} from 'utils/constants';


describe('scrollTo reducer', function () {
  describe('SEARCH_TERMS_NAVIGATION_RESET', function () {
    it('set to true', function () {
      scrollTo( false, {
        type: SEARCH_TERMS_NAVIGATION_RESET,
        payload: {}
      }).should.deepEqual(true);
    });
  });

  describe('SEARCH_TERMS_NAVIGATION_DOWN', function () {
    it('set to true', function () {
      scrollTo( false, {
        type: SEARCH_TERMS_NAVIGATION_DOWN,
        payload: {}
      }).should.deepEqual(true);
    });
  });

  describe('SEARCH_TERMS_NAVIGATION_UP', function () {
    it('set to true', function () {
      scrollTo( false, {
        type: SEARCH_TERMS_NAVIGATION_UP,
        payload: {}
      }).should.deepEqual(true);
    });
  });

  describe('SEARCH_TERMS_NAVIGATION_SET', function () {
    it('set to false', function () {
      scrollTo( true, {
        type: SEARCH_TERMS_NAVIGATION_SET,
        payload: {}
      }).should.deepEqual(false);
    });
  });
});
