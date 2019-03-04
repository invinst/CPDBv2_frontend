import {
  getComplaintSummaries,
  turnOffCarouselComplaintHeaderEditMode,
  turnOnCarouselComplaintHeaderEditMode
} from 'actions/landing-page/complaint-summaries';
import * as constants from 'utils/constants';


describe('getComplaintSummaries action', function () {
  it('should return correct action', function () {
    getComplaintSummaries().should.eql({
      types: [
        constants.RECENT_COMPLAINT_SUMMARIES_REQUEST_START,
        constants.RECENT_COMPLAINT_SUMMARIES_REQUEST_SUCCESS,
        constants.RECENT_COMPLAINT_SUMMARIES_REQUEST_FAILURE
      ],
      payload: {
        request: {
          url: constants.RECENT_COMPLAINT_SUMMARIES_URL,
          adapter: null,
          params: undefined,
          cancelToken: undefined
        }
      }
    });
  });
});

describe('turnOnCarouselComplaintHeaderEditMode action', function () {
  it('should return correct action', function () {
    turnOnCarouselComplaintHeaderEditMode().should.eql({
      type: constants.TURN_ON_CAROUSEL_HEADER_EDIT_MODE,
      payload: constants.CAROUSEL_TYPES.COMPLAINT
    });
  });
});

describe('turnOffCarouselComplaintHeaderEditMode action', function () {
  it('should return correct action', function () {
    turnOffCarouselComplaintHeaderEditMode().should.eql({
      type: constants.TURN_OFF_CAROUSEL_HEADER_EDIT_MODE,
      payload: constants.CAROUSEL_TYPES.COMPLAINT
    });
  });
});
