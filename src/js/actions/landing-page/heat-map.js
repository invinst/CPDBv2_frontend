import { get } from 'actions/common/async-action';
import * as constants from 'utils/constants';
import { communityGeoJSONPath, clusterGeoJSONPath } from 'utils/static-assets';


export const getCommunities = get(
  communityGeoJSONPath,
  [
    constants.COMMUNITY_REQUEST_START,
    constants.COMMUNITY_REQUEST_SUCCESS,
    constants.COMMUNITY_REQUEST_FAILURE
  ]
);

export const getClusterGeoJson = get(
  clusterGeoJSONPath,
  [
    constants.CLUSTER_GEO_REQUEST_START,
    constants.CLUSTER_GEO_REQUEST_SUCCESS,
    constants.CLUSTER_GEO_REQUEST_FAILURE
  ]
);
