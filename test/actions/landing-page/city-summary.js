import { getCitySummary } from 'actions/landing-page/city-summary';
import * as constants from 'utils/constants';


describe('getCitySummary action', function () {
  it('should return correct payload', function () {
    getCitySummary().should.eql({
      types: [
        constants.CITY_SUMMARY_REQUEST_START,
        constants.CITY_SUMMARY_REQUEST_SUCCESS,
        constants.CITY_SUMMARY_REQUEST_FAILURE,
      ],
      payload: {
        request: {
          url: constants.CITY_SUMMARY_API_URL,
          params: undefined,
          cancelToken: undefined,
        },
      },
    });
  });
});
