import {
  getRecentDocument,
  turnOffCarouselDocumentHeaderEditMode,
  turnOnCarouselDocumentHeaderEditMode,
} from 'actions/landing-page/recent-document';
import * as constants from 'utils/constants';


describe('getRecentDocument action', function () {
  it('should return correct action', function () {
    getRecentDocument().should.eql({
      types: [
        constants.RECENT_DOCUMENT_REQUEST_START,
        constants.RECENT_DOCUMENT_REQUEST_SUCCESS,
        constants.RECENT_DOCUMENT_REQUEST_FAILURE,
      ],
      payload: {
        request: {
          url: constants.RECENT_DOCUMENT_URL,
          params: undefined,
          cancelToken: undefined,
        },
      },
    });
  });
});

describe('turnOnCarouselDocumentHeaderEditMode action', function () {
  it('should return correct action', function () {
    turnOnCarouselDocumentHeaderEditMode().should.eql({
      type: constants.TURN_ON_CAROUSEL_HEADER_EDIT_MODE,
      payload: constants.CAROUSEL_TYPES.DOCUMENT,
    });
  });
});

describe('turnOffCarouselDocumentHeaderEditMode action', function () {
  it('should return correct action', function () {
    turnOffCarouselDocumentHeaderEditMode().should.eql({
      type: constants.TURN_OFF_CAROUSEL_HEADER_EDIT_MODE,
      payload: constants.CAROUSEL_TYPES.DOCUMENT,
    });
  });
});

