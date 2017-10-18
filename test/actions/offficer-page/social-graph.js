import { fetchSocialGraph, setYearRange } from 'actions/officer-page/social-graph';
import * as constants from 'utils/constants';

describe('SocialGraph actions', function () {
  describe('fetchSocialGraph', function () {
    it('should return the right action', function () {
      fetchSocialGraph(123).should.eql({
        types: [
          constants.OFFICER_SOCIAL_GRAPH_REQUEST_START,
          constants.OFFICER_SOCIAL_GRAPH_REQUEST_SUCCESS,
          constants.OFFICER_SOCIAL_GRAPH_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${constants.OFFICER_URL}123/social-graph/`,
            params: undefined,
            adapter: null
          }
        }
      });
    });
  });

  describe('setYearRange', function () {
    it('should return the right action', function () {
      setYearRange([2000, 2015]).should.eql({
        type: constants.OFFICER_SOCIAL_GRAPH_SET_YEAR_RANGE,
        payload: [2000, 2015]
      });
    });
  });
});
