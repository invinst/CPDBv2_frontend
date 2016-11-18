import vftgSectionEditMode from 'reducers/landing-page/vftg-section/edit-mode-on';
import { TURN_ON_SECTION_EDIT_MODE, TURN_OFF_SECTION_EDIT_MODE, VFTG } from 'actions/landing-page';


describe('vftgSectionEditModeOn reducer', function () {
  it('should return initial state', function () {
    vftgSectionEditMode(undefined, true).should.eql(false);
  });

  it('should change to true when turn on edit mode', function () {
    vftgSectionEditMode(undefined, {
      type: TURN_ON_SECTION_EDIT_MODE,
      payload: VFTG
    }).should.eql(true);
  });

  it('should change to false when turn off edit mode', function () {
    vftgSectionEditMode(undefined, {
      type: TURN_OFF_SECTION_EDIT_MODE,
      payload: 'no VFTG'
    }).should.eql(false);
  });
});
