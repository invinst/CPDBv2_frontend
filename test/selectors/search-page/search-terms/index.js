import {
  hiddenSelector,
} from 'selectors/search-page/search-terms';
import { categoriesSelector } from 'selectors/search-page/search-terms/categories';


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

  describe('categoriesSelector', function () {
    it('should return categories', function () {
      categoriesSelector(state).should.eql([{ name: 'abc' }]);
    });
  });
});
