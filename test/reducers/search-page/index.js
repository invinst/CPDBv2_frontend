import searchPage from 'reducers/search-page';


describe('searchPage reducer', function () {
  it('should have initial state', function () {
    searchPage(undefined, {}).should.deepEqual({
      navigation: { 'itemIndex': 0 },
      isRequesting: false,
      suggestionGroups: {
        meta: {},
      },
      contentType: null,
      recentSuggestions: [],
      searchTerms: {
        categories: [],
        hidden: true,
        navigation: {
          itemIndex: 0,
        },
      },
      tags: [],
      query: '',
      pagination: {},
    });
  });
});
