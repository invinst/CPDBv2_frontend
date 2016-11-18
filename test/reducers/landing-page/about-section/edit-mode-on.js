import aboutSectionEditModeOn from 'reducers/landing-page/about-section/edit-mode-on';
import { TURN_ON_SECTION_EDIT_MODE, TURN_OFF_SECTION_EDIT_MODE, ABOUT } from 'actions/landing-page';


describe('aboutSectionEditModeOn reducer', function () {
  it('should return initial state', function () {
    aboutSectionEditModeOn(undefined, true).should.eql(false);
  });

  it('should change to true when turn on edit mode', function () {
    aboutSectionEditModeOn(undefined, {
      type: TURN_ON_SECTION_EDIT_MODE,
      payload: ABOUT
    }).should.eql(true);
  });

  it('should change to false when turn off edit mode', function () {
    aboutSectionEditModeOn(undefined, {
      type: TURN_OFF_SECTION_EDIT_MODE,
      payload: 'no ABOUT'
    }).should.eql(false);
  });
});
