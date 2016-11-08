import faqSectionEditModeOn from 'reducers/landing-page/faq-section/edit-mode-on';
import { TURN_ON_SECTION_EDIT_MODE, TURN_OFF_SECTION_EDIT_MODE, FAQ } from 'actions/landing-page';


describe('faqSectionEditModeOn reducer', function () {
  it('should return initial state', function () {
    faqSectionEditModeOn(undefined, true).should.eql(false);
  });

  it('should change to true when turn on edit mode', function () {
    faqSectionEditModeOn(undefined, {
      type: TURN_ON_SECTION_EDIT_MODE,
      payload: FAQ
    }).should.eql(true);
  });

  it('should change to false when turn off edit mode', function () {
    faqSectionEditModeOn(undefined, {
      type: TURN_OFF_SECTION_EDIT_MODE,
      payload: 'no FAQ'
    }).should.eql(false);
  });
});
