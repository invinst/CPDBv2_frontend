import {
  TURN_ON_TAGS_EDIT_MODE,
  TURN_OFF_TAGS_EDIT_MODE,
  LOCATION_CHANGE,
} from 'utils/constants';
import tagsEditModeOn from 'reducers/document-page/tags-edit-mode-on';


describe('tagsEditModeOn reducer', function () {
  it('should return initial state', function () {
    tagsEditModeOn(undefined, {}).should.be.false();
  });

  it('should handle TURN_ON_TAGS_EDIT_MODE', function () {
    tagsEditModeOn(undefined, { type: TURN_ON_TAGS_EDIT_MODE }).should.be.true();
  });

  it('should handle TURN_OFF_TAGS_EDIT_MODE', function () {
    tagsEditModeOn(undefined, { type: TURN_OFF_TAGS_EDIT_MODE }).should.be.false();
  });

  it('should handle LOCATION_CHANGE', function () {
    tagsEditModeOn(false, {
      type: LOCATION_CHANGE
    }).should.be.false();

    tagsEditModeOn(true, {
      type: LOCATION_CHANGE,
      payload: {
        pathname: '/document/1234'
      }
    }).should.be.false();

    tagsEditModeOn(true, {
      type: LOCATION_CHANGE,
      payload: {
        pathname: '/edit/document/1234'
      }
    }).should.be.true();
  });
});
