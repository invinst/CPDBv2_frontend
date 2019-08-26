import logoSectionEditModeOn from 'reducers/headers/slim-header/logo-section-edit-mode-on';
import * as constants from 'utils/constants';


describe('logoSectionEditModeOn reducer', function () {
  it('should have initial state', function () {
    logoSectionEditModeOn(undefined, {}).should.be.false();
  });

  it('should handle TURN_ON_LOGO_EDIT_MODE', function () {
    logoSectionEditModeOn(undefined, {
      type: constants.TURN_ON_LOGO_EDIT_MODE,
    }).should.be.true();
  });

  it('should handle TURN_OFF_LOGO_EDIT_MODE', function () {
    logoSectionEditModeOn(undefined, {
      type: constants.TURN_OFF_LOGO_EDIT_MODE,
    }).should.be.false();
  });

  it('should handle LOCATION_CHANGE', function () {
    logoSectionEditModeOn(false, {
      type: constants.LOCATION_CHANGE,
    }).should.be.false();

    logoSectionEditModeOn(true, {
      type: constants.LOCATION_CHANGE,
      payload: {
        pathname: '/123',
      },
    }).should.be.false();

    logoSectionEditModeOn(true, {
      type: constants.LOCATION_CHANGE,
      payload: {
        pathname: '/edit/123',
      },
    }).should.be.true();
  });
});
