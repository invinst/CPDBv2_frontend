import { LOCATION_CHANGE } from 'connected-react-router';

import editModeOn from 'reducers/trr-page/edit-mode-on';
import { TRR_EDIT_TYPES, TRR_EDIT_MODE } from 'utils/constants';


describe('edit-mode-on reducer', function () {
  it('should have initial state', function () {
    editModeOn(undefined, {}).should.eql({
      [TRR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: false,
      [TRR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: false,
    });
  });

  it('should handle TRR_EDIT_MODE', function () {
    editModeOn(
      {
        [TRR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: false,
        [TRR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: false,
      },
      {
        type: TRR_EDIT_MODE,
        payload: { editType: TRR_EDIT_TYPES.NO_ATTACHMENT_TEXT, mode: true },
      }
    ).should.eql( {
      [TRR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: true,
      [TRR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: false,
    });

    editModeOn(
      {
        [TRR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: true,
        [TRR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: false,
      },
      {
        type: TRR_EDIT_MODE,
        payload: { editType: TRR_EDIT_TYPES.NO_ATTACHMENT_TEXT, mode: false },
      }
    ).should.eql( {
      [TRR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: false,
      [TRR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: false,
    });
  });

  it('should handle LOCATION_CHANGE', function () {
    editModeOn(
      {
        [TRR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: true,
        [TRR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: true,
      },
      {
        type: LOCATION_CHANGE,
        payload: { location: { pathname: '/trr/1/' } },
      }
    ).should.eql({
      [TRR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: false,
      [TRR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: false,
    });

    editModeOn(
      {
        [TRR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: true,
        [TRR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: true,
      },
      {
        type: LOCATION_CHANGE,
        payload: { location: { pathname: '/edit/trr/1/' } },
      }
    ).should.eql({
      [TRR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: true,
      [TRR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: true,
    });
  });
});
