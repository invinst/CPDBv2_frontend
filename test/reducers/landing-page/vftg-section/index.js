import vftgSection from 'reducers/landing-page/vftg-section';


describe('vftgSection reducer', function () {
  it('should return initial state', function () {
    vftgSection(undefined, {}).should.eql({
      fields: {},
      editModeOn: false
    });
  });
});
