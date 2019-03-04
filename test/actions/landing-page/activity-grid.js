import {
  requestActivityGrid,
  turnOnCarouselActivityHeaderEditMode,
  turnOffCarouselActivityHeaderEditMode
} from 'actions/landing-page/activity-grid';
import * as constants from 'utils/constants';


describe('requestActivityGrid action', function () {
  it('should return correct action', function () {
    requestActivityGrid().should.eql({
      types: [
        constants.ACTIVITY_GRID_REQUEST_START,
        constants.ACTIVITY_GRID_REQUEST_SUCCESS,
        constants.ACTIVITY_GRID_REQUEST_FAILURE
      ],
      payload: {
        request: {
          url: constants.ACTIVITY_GRID_API_URL,
          adapter: null,
          params: undefined,
          cancelToken: undefined
        }
      }
    });
  });
});

describe('turnOnCarouselActivityHeaderEditMode action', function () {
  it('should return correct action', function () {
    turnOnCarouselActivityHeaderEditMode().should.eql({
      type: constants.TURN_ON_CAROUSEL_HEADER_EDIT_MODE,
      payload: constants.CAROUSEL_TYPES.ACTIVITY
    });
  });
});

describe('turnOffCarouselActivityHeaderEditMode action', function () {
  it('should return correct action', function () {
    turnOffCarouselActivityHeaderEditMode().should.eql({
      type: constants.TURN_OFF_CAROUSEL_HEADER_EDIT_MODE,
      payload: constants.CAROUSEL_TYPES.ACTIVITY
    });
  });
});
