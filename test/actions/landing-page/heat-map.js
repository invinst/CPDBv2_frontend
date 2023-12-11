import { getCommunities, getClusterGeoJson, heatMapLoaded } from 'actions/landing-page/heat-map';
import {
  CLUSTER_GEO_REQUEST_START,
  CLUSTER_GEO_REQUEST_SUCCESS,
  CLUSTER_GEO_REQUEST_FAILURE,
  COMMUNITY_REQUEST_START,
  COMMUNITY_REQUEST_SUCCESS,
  COMMUNITY_REQUEST_FAILURE,
  HEAT_MAP_LOADED,
} from 'utils/constants';
import { communityGeoJSONPath, clusterGeoJSONPath } from 'utils/static-assets';


describe('heatmap actions', function () {
  describe('getClusterGeoJson', function () {
    it('should return correct payload', function () {
      getClusterGeoJson().should.eql({
        types: [
          CLUSTER_GEO_REQUEST_START,
          CLUSTER_GEO_REQUEST_SUCCESS,
          CLUSTER_GEO_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: clusterGeoJSONPath,
            params: undefined,
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
          COMMUNITY_REQUEST_START,
          COMMUNITY_REQUEST_SUCCESS,
          COMMUNITY_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: communityGeoJSONPath,
            params: undefined,
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('heatMapLoaded action', function () {
    it('should return correct payload', function () {
      heatMapLoaded().should.eql({
        type: HEAT_MAP_LOADED,
        payload: undefined,
      });
    });
  });
});
