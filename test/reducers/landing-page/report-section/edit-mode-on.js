import reportSectionEditModeOn from 'reducers/landing-page/report-section/edit-mode-on';
import { TURN_ON_SECTION_EDIT_MODE, TURN_OFF_SECTION_EDIT_MODE, REPORTING } from 'actions/landing-page';


describe('reportSectionEditModeOn reducer', function () {
  it('should return initial state', function () {
    reportSectionEditModeOn(undefined, true).should.eql(false);
  });

  it('should change to true when turn on edit mode', function () {
    reportSectionEditModeOn(undefined, {
      type: TURN_ON_SECTION_EDIT_MODE,
      payload: REPORTING
    }).should.eql(true);
  });

  it('should change to false when turn off edit mode', function () {
    reportSectionEditModeOn(undefined, {
      type: TURN_OFF_SECTION_EDIT_MODE,
      payload: 'no REPORTING'
    }).should.eql(false);
  });
});
