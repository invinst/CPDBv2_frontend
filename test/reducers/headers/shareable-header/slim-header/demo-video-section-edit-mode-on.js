import demoVideoSectionEditModeOn from 'reducers/headers/slim-header/demo-video-section-edit-mode-on';
import * as constants from 'utils/constants';


describe('demoVideoSectionEditModeOn reducer', function () {
  it('should have initial state', function () {
    demoVideoSectionEditModeOn(undefined, {}).should.be.false();
  });

  it('should handle TURN_ON_LOGO_EDIT_MODE', function () {
    demoVideoSectionEditModeOn(undefined, {
      type: constants.TURN_ON_DEMO_VIDEO_EDIT_MODE,
    }).should.be.true();
  });

  it('should handle TURN_OFF_LOGO_EDIT_MODE', function () {
    demoVideoSectionEditModeOn(undefined, {
      type: constants.TURN_OFF_DEMO_VIDEO_EDIT_MODE,
    }).should.be.false();
  });

  it('should handle LOCATION_CHANGE', function () {
    demoVideoSectionEditModeOn(false, {
      type: constants.LOCATION_CHANGE,
    }).should.be.false();

    demoVideoSectionEditModeOn(true, {
      type: constants.LOCATION_CHANGE,
      payload: {
        pathname: '/123',
      },
    }).should.be.false();

    demoVideoSectionEditModeOn(true, {
      type: constants.LOCATION_CHANGE,
      payload: {
        pathname: '/edit/123',
      },
    }).should.be.true();
  });
});
