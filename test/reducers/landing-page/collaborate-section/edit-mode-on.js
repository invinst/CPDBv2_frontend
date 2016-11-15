import collaborateSectionEditModeOn from 'reducers/landing-page/collaborate-section/edit-mode-on';
import { TURN_ON_SECTION_EDIT_MODE, TURN_OFF_SECTION_EDIT_MODE, COLLABORATE } from 'actions/landing-page';


describe('collaborateSectionEditModeOn reducer', function () {
  it('should return initial state', function () {
    collaborateSectionEditModeOn(undefined, true).should.eql(false);
  });

  it('should change to true when turn on edit mode', function () {
    collaborateSectionEditModeOn(undefined, {
      type: TURN_ON_SECTION_EDIT_MODE,
      payload: COLLABORATE
    }).should.eql(true);
  });

  it('should change to false when turn off edit mode', function () {
    collaborateSectionEditModeOn(undefined, {
      type: TURN_OFF_SECTION_EDIT_MODE,
      payload: 'no COLLABORATE'
    }).should.eql(false);
  });
});
