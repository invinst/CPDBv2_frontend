import heroSection from 'reducers/landing-page/hero-section';


describe('heroSection reducer', function () {
  it('should return initial state', function () {
    heroSection(undefined, {}).should.eql({
      fields: {},
      editModeOn: false
    });
  });
});
