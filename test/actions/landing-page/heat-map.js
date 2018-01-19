import { getCommunities } from 'actions/landing-page/heat-map';
import * as constants from 'utils/constants';
import { communityGeoJSONPath } from 'utils/static-assets';


describe('getCommunities action', function () {
  it('should return correct payload', function () {
    getCommunities().should.eql({
      types: [
        constants.COMMUNITY_REQUEST_START,
        constants.COMMUNITY_REQUEST_SUCCESS,
        constants.COMMUNITY_REQUEST_FAILURE
      ],
      payload: {
        request: {
          url: communityGeoJSONPath,
          params: undefined,
          adapter: null
        }
      }
    });
  });
});
