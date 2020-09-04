import {
  getTopLawsuits,
  turnOffCarouselLawsuitHeaderEditMode,
  turnOnCarouselLawsuitHeaderEditMode,
} from 'actions/landing-page/top-lawsuits';
import {
  CAROUSEL_TYPES,
  TOP_LAWSUITS_REQUEST_FAILURE,
  TOP_LAWSUITS_REQUEST_START,
  TOP_LAWSUITS_REQUEST_SUCCESS,
  TOP_LAWSUITS_URL,
  TURN_OFF_CAROUSEL_HEADER_EDIT_MODE,
  TURN_ON_CAROUSEL_HEADER_EDIT_MODE,
} from 'utils/constants';


describe('getTopLawsuits action', function () {
  it('should return correct action', function () {
    getTopLawsuits().should.eql({
      types: [
        TOP_LAWSUITS_REQUEST_START,
        TOP_LAWSUITS_REQUEST_SUCCESS,
        TOP_LAWSUITS_REQUEST_FAILURE,
      ],
      payload: {
        request: {
          url: TOP_LAWSUITS_URL,
          params: undefined,
          cancelToken: undefined,
        },
      },
    });
  });
});

describe('turnOnCarouselLawsuitHeaderEditMode action', function () {
  it('should return correct action', function () {
    turnOnCarouselLawsuitHeaderEditMode().should.eql({
      type: TURN_ON_CAROUSEL_HEADER_EDIT_MODE,
      payload: CAROUSEL_TYPES.LAWSUIT,
    });
  });
});

describe('turnOffCarouselLawsuitHeaderEditMode action', function () {
  it('should return correct action', function () {
    turnOffCarouselLawsuitHeaderEditMode().should.eql({
      type: TURN_OFF_CAROUSEL_HEADER_EDIT_MODE,
      payload: CAROUSEL_TYPES.LAWSUIT,
    });
  });
});
