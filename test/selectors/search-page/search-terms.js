import {
  hiddenSelector,
  categoriesSelector,
} from 'selectors/search-page/search-terms';

import { navigationItemsSelector } from 'selectors/search-page/search-terms/navigation';

describe('search terms selectors', function () {
  const state = {
    searchPage: {
      searchTerms: {
        hidden: false,
        categories: [{
          name: 'abc'
        }],
        selectedCategory: 1
      }
    }
  };

  describe('hiddenSelector', function () {
    it('should return hidden state', function () {
      hiddenSelector(state).should.be.false();
    });
  });

  describe('navigationItemsSelector', function () {
    it('should return navigation items', function () {
      navigationItemsSelector(state).should.eql(['abc']);
    });
  });

  describe('categoriesSelector', function () {
    it('should return categories', function () {
      categoriesSelector(state).should.eql([{ name: 'abc' }]);
    });
  });
});
