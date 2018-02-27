import searchTerms from 'reducers/search-page/search-terms';


describe('searchTerms reducer', function () {
  it('should have initial state', function () {
    searchTerms(undefined, {}).should.deepEqual({
      categories: [],
      hidden: true,
      navigation: {
        itemIndex: 0,
        scrollTo: true,
      }
    });
  });
});
