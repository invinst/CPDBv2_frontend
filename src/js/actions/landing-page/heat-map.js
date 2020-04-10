import { createAction } from 'redux-actions';

import { get } from 'actions/common/async-action';
import {
  COMMUNITY_REQUEST_START,
  COMMUNITY_REQUEST_SUCCESS,
  COMMUNITY_REQUEST_FAILURE,
  CLUSTER_GEO_REQUEST_START,
  CLUSTER_GEO_REQUEST_SUCCESS,
  CLUSTER_GEO_REQUEST_FAILURE,
  HEAT_MAP_LOADED,
} from 'utils/constants';
import { communityGeoJSONPath, clusterGeoJSONPath } from 'utils/static-assets';


export const getCommunities = get(
  communityGeoJSONPath,
  [
    COMMUNITY_REQUEST_START,
    COMMUNITY_REQUEST_SUCCESS,
    COMMUNITY_REQUEST_FAILURE,
  ]
);

export const getClusterGeoJson = get(
  clusterGeoJSONPath,
  [
    CLUSTER_GEO_REQUEST_START,
    CLUSTER_GEO_REQUEST_SUCCESS,
    CLUSTER_GEO_REQUEST_FAILURE,
  ]
);

export const heatMapLoaded = createAction(HEAT_MAP_LOADED);
