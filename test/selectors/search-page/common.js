import { getQuery } from 'selectors/search-page/common';


describe('SearchPage common selectors', function () {
  const state = {
    searchPage: {
      query: 'summary',
    },
  };

  describe('getQuery', function () {
    it('should return correct query', function () {
      getQuery(state).should.be.eql('summary');
    });
  });
});
