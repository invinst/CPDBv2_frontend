import suggestionApp from 'reducers/landing-page/suggestion-app';


describe('suggestionApp reducer', function () {
  it('should have initial state', function () {
    suggestionApp(undefined, {}).should.deepEqual({
      isRequesting: false,
      suggestions: []
    });
  });
});
