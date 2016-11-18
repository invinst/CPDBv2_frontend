import collaborateSection from 'reducers/landing-page/collaborate-section';


describe('collaborateSection reducer', function () {
  it('should return initial state', function () {
    collaborateSection(undefined, {}).should.eql({
      fields: {},
      editModeOn: false
    });
  });
});
