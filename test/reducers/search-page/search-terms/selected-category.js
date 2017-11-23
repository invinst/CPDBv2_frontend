import should from 'should';

import selectedCategory from 'reducers/search-page/search-terms/selected-category';
import * as constants from 'utils/constants';


describe('selectedCategory reducer', function () {
  it('should have initial state', function () {
    should(selectedCategory(undefined, {})).be.null();
  });

  it('should handle SELECT_CATEGORY', function () {
    selectedCategory(undefined, {
      type: constants.SELECT_CATEGORY,
      payload: 'abc'
    }).should.equal('abc');
  });

  it('should handle TOGGLE_SEARCH_TERMS', function () {
    should(selectedCategory('abc', {
      type: constants.TOGGLE_SEARCH_TERMS
    })).be.null();
  });
});
