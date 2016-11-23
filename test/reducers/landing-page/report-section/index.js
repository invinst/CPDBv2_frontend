import reportSection from 'reducers/landing-page/report-section';


describe('reportSection reducer', function () {
  it('should return initial state', function () {
    reportSection(undefined, {}).should.eql({
      fields: {},
      editModeOn: false,
      reports: []
    });
  });
});
