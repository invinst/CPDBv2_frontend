import { getCategories, hasCategoriesSelector } from 'selectors/search-page/search-terms/categories';


describe('categories selectors', function () {
  const state = {
    searchPage: {
      searchTerms: {
        categories: [{
          name: 'abc',
        }],
      },
    },
  };

  describe('getCategories', function () {
    it('should return categories', function () {
      getCategories(state).should.eql([{ name: 'abc' }]);
      getCategories({}).should.eql([]);
    });
  });

  describe('hasCategoriesSelector', function () {
    it('should return true if categories is not empty', function () {
      hasCategoriesSelector(state).should.be.true();
    });

    it('should return false if categories is empty', function () {
      hasCategoriesSelector({}).should.be.false();
    });
  });
});
