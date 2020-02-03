import { LOCATION_CHANGE } from 'react-router-redux';

import {
  TURN_ON_DOCUMENT_TITLE_EDIT_MODE,
  TURN_OFF_DOCUMENT_TITLE_EDIT_MODE,
} from 'utils/constants';
import titleEditModeOn from 'reducers/document-page/title-edit-mode-on';


describe('titleEditModeOn reducer', function () {
  it('should return initial state', function () {
    titleEditModeOn(undefined, {}).should.be.false();
  });

  it('should handle TURN_ON_DOCUMENT_TITLE_EDIT_MODE', function () {
    titleEditModeOn(undefined, { type: TURN_ON_DOCUMENT_TITLE_EDIT_MODE }).should.be.true();
  });

  it('should handle TURN_OFF_DOCUMENT_TITLE_EDIT_MODE', function () {
    titleEditModeOn(undefined, { type: TURN_OFF_DOCUMENT_TITLE_EDIT_MODE }).should.be.false();
  });

  it('should handle LOCATION_CHANGE', function () {
    titleEditModeOn(false, {
      type: LOCATION_CHANGE,
    }).should.be.false();

    titleEditModeOn(true, {
      type: LOCATION_CHANGE,
      payload: {
        location: { pathname: '/document/1234' },
      },
    }).should.be.false();

    titleEditModeOn(true, {
      type: LOCATION_CHANGE,
      payload: {
        location: { pathname: '/edit/document/1234' },
      },
    }).should.be.true();
  });
});
