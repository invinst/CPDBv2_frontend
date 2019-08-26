import cmsReducer from 'reducers/cms';


describe('cms reducer', function () {
  it('should have initial state', function () {
    cmsReducer(undefined, {}).should.deepEqual({
      pages: {},
    });
  });
});
