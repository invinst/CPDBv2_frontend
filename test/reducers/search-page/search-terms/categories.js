import {
  SEARCH_TERMS_CATEGORIES_REQUEST_START,
  SEARCH_TERMS_CATEGORIES_REQUEST_FAILURE,
  SEARCH_TERMS_CATEGORIES_REQUEST_SUCCESS,
} from 'utils/constants';
import categories from 'reducers/search-page/search-terms/categories';


describe('categories reducer', function () {
  it('should return initial state', function () {
    categories(undefined, {}).should.eql([]);
  });

  it('should handle SEARCH_TERMS_CATEGORIES_REQUEST_START', function () {
    categories('abc', {
      type: SEARCH_TERMS_CATEGORIES_REQUEST_START,
    }).should.eql('abc');
  });

  it('should handle SEARCH_TERMS_CATEGORIES_REQUEST_FAILURE', function () {
    categories('abc', {
      type: SEARCH_TERMS_CATEGORIES_REQUEST_FAILURE,
    }).should.eql('abc');
  });

  it('should handle SEARCH_TERMS_CATEGORIES_REQUEST_SUCCESS', function () {
    categories('abc', {
      type: SEARCH_TERMS_CATEGORIES_REQUEST_SUCCESS,
      payload: 'def',
    }).should.eql('def');
  });
});
