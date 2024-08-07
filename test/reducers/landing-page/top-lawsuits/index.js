import topLawsuits from 'reducers/landing-page/top-lawsuits';


describe('topLawsuits reducer', function () {
  it('should return initial state', function () {
    topLawsuits(undefined, {}).should.eql({
      cards: [],
      headerEditModeOn: false,
    });
  });
});
