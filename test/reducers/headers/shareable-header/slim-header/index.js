import slimHeaderReducer from 'reducers/headers/slim-header';


describe('slimHeader reducer', function () {
  it('should have initial state', function () {
    slimHeaderReducer(undefined, {}).should.deepEqual({
      logoSectionEditModeOn: false,
      videoInfo: [],
    });
  });
});
