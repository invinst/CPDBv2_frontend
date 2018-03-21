import { fetchPercentile } from 'actions/officer-page/radar-chart';
import * as constants from 'utils/constants';

describe('Radar Chart actions', function () {
  describe('fetchPercentile', function () {
    it('should return the right action', function () {
      fetchPercentile(123).should.eql({
        types: [
          constants.PERCENTILE_REQUEST_START,
          constants.PERCENTILE_REQUEST_SUCCESS,
          constants.PERCENTILE_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${constants.OFFICER_URL}123/percentile/`,
            params: undefined,
            adapter: null
          }
        }
      });
    });
  });
});
