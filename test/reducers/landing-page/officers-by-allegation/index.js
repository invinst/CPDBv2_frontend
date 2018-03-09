import officersByAllegation from 'reducers/landing-page/officers-by-allegation';


describe('officersByAllegation reducer', function () {
  it('should return initial state', function () {
    officersByAllegation(undefined, {}).should.eql({
      cards: [],
      isRequesting: false,
      headerEditModeOn: false,
    });
  });
});
