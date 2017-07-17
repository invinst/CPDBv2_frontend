import searchPage from 'reducers/search-page';


describe('searchPage reducer', function () {
  it('should have initial state', function () {
    searchPage(undefined, {}).should.deepEqual({
      navigation: { 'columnIndex': 0, 'itemIndex': 0 },
      isRequesting: false,
      suggestionGroups: {},
      contentType: null,
      recentSuggestions: [],
      itemsPerColumn: 10,
      tags: [],
      query: ''
    });
  });
});
