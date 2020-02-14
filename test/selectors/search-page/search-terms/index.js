import { hiddenSelector } from 'selectors/search-page/search-terms';


describe('search terms selectors', function () {
  describe('hiddenSelector', function () {
    it('should return hidden state based on the query', function () {
      hiddenSelector({
        searchPage: { query: '' },
      }).should.be.false();

      hiddenSelector({
        searchPage: { query: 'Ke' },
      }).should.be.true();
    });
  });
});
