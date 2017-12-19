import hidden from 'reducers/search-page/search-terms/hidden';


describe('hidden reducer', function () {
  it('should return initial state', function () {
    hidden(undefined, {}).should.eql(true);
  });

  it('should toggle when received TOGGLE_SEARCH_TERMS', function () {
    hidden(false, {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: '/search/'
      }
    }).should.eql(true);

    hidden(true, {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: '/search/terms/'
      }
    }).should.eql(false);
  });
});
