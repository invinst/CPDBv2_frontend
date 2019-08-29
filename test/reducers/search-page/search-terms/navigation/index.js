import navigation from 'reducers/search-page/search-terms/navigation';


describe('navigation reducer', function () {
  it('should have initial state', function () {
    navigation(undefined, {}).should.deepEqual({
      itemIndex: 0,
    });
  });
});
