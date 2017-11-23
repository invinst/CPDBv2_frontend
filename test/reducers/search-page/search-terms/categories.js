import * as constants from 'utils/constants';
import categories from 'reducers/search-page/search-terms/categories';


describe('categories reducer', function () {
  it('should return initial state', function () {
    categories(undefined, {}).should.eql([]);
  });

  it('should handle SEARCH_TERM_CATEGORIES_REQUEST_START', function () {
    categories('abc', {
      type: constants.SEARCH_TERM_CATEGORIES_REQUEST_START
    }).should.eql('abc');
  });

  it('should handle SEARCH_TERM_CATEGORIES_REQUEST_FAILURE', function () {
    categories('abc', {
      type: constants.SEARCH_TERM_CATEGORIES_REQUEST_FAILURE
    }).should.eql('abc');
  });

  it('should handle SEARCH_TERM_CATEGORIES_REQUEST_SUCCESS', function () {
    categories('abc', {
      type: constants.SEARCH_TERM_CATEGORIES_REQUEST_SUCCESS,
      payload: 'def'
    }).should.eql('def');
  });
});
