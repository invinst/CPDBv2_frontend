import aboutSection from 'reducers/landing-page/about-section';


describe('aboutSection reducer', function () {
  it('should return initial state', function () {
    aboutSection(undefined, {}).should.eql({
      fields: {},
      editModeOn: false
    });
  });
});
