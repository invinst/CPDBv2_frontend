import {
  TURN_ON_DOCUMENT_TEXT_CONTENT_EDIT_MODE,
  TURN_OFF_DOCUMENT_TEXT_CONTENT_EDIT_MODE,
  LOCATION_CHANGE,
} from 'utils/constants';
import textContentEditModeOn from 'reducers/document-page/text-content-edit-mode-on';


describe('textContentEditModeOn reducer', function () {
  it('should return initial state', function () {
    textContentEditModeOn(undefined, {}).should.be.false();
  });

  it('should handle TURN_ON_DOCUMENT_TEXT_CONTENT_EDIT_MODE', function () {
    textContentEditModeOn(undefined, { type: TURN_ON_DOCUMENT_TEXT_CONTENT_EDIT_MODE }).should.be.true();
  });

  it('should handle TURN_OFF_DOCUMENT_TEXT_CONTENT_EDIT_MODE', function () {
    textContentEditModeOn(undefined, { type: TURN_OFF_DOCUMENT_TEXT_CONTENT_EDIT_MODE }).should.be.false();
  });

  it('should handle LOCATION_CHANGE', function () {
    textContentEditModeOn(false, {
      type: LOCATION_CHANGE,
    }).should.be.false();

    textContentEditModeOn(true, {
      type: LOCATION_CHANGE,
      payload: {
        pathname: '/document/1234',
      },
    }).should.be.false();

    textContentEditModeOn(true, {
      type: LOCATION_CHANGE,
      payload: {
        pathname: '/edit/document/1234',
      },
    }).should.be.true();
  });
});
