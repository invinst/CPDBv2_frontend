import heroSectionEditModeOn from 'reducers/landing-page/hero-section/edit-mode-on';
import { TURN_ON_SECTION_EDIT_MODE, TURN_OFF_SECTION_EDIT_MODE, HERO } from 'actions/landing-page';


describe('heroSectionEditModeOn reducer', function () {
  it('should return initial state', function () {
    heroSectionEditModeOn(undefined, true).should.eql(false);
  });

  it('should change to true when turn on edit mode', function () {
    heroSectionEditModeOn(undefined, {
      type: TURN_ON_SECTION_EDIT_MODE,
      payload: HERO
    }).should.eql(true);
  });

  it('should change to false when turn off edit mode', function () {
    heroSectionEditModeOn(undefined, {
      type: TURN_OFF_SECTION_EDIT_MODE,
      payload: 'no HERO'
    }).should.eql(false);
  });
});
