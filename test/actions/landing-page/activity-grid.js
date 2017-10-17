import { requestActivityGrid } from 'actions/landing-page/activity-grid';
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
          params: undefined
        }
      }
    });
  });
});
