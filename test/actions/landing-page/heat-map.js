import { getCommunities, getClusterGeoJson } from 'actions/landing-page/heat-map';
import * as constants from 'utils/constants';
import { communityGeoJSONPath, clusterGeoJSONPath } from 'utils/static-assets';


describe('heatmap actions', function () {
  describe('getClusterGeoJson', function () {
    it('should return correct payload', function () {
      getClusterGeoJson().should.eql({
        types: [
          constants.CLUSTER_GEO_REQUEST_START,
          constants.CLUSTER_GEO_REQUEST_SUCCESS,
          constants.CLUSTER_GEO_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: clusterGeoJSONPath,
            params: undefined,
            adapter: null,
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('getCommunities action', function () {
    it('should return correct payload', function () {
      getCommunities().should.eql({
        types: [
          constants.COMMUNITY_REQUEST_START,
          constants.COMMUNITY_REQUEST_SUCCESS,
          constants.COMMUNITY_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: communityGeoJSONPath,
            params: undefined,
            adapter: null,
            cancelToken: undefined,
          },
        },
      });
    });
  });
});
