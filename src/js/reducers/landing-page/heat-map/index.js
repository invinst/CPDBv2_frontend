import { combineReducers } from 'redux';

import citySummary from './city-summary';
import communities from './communities';
import clusterGeoJson from './cluster-geo-json';
import communitiesRequested from './communities-requested';
import clusterGeoJsonRequested from './cluster-geo-json-requested';
import heatMapLoaded from './head-map-loaded';


export default combineReducers({
  citySummary,
  communities,
  clusterGeoJson,
  communitiesRequested,
  clusterGeoJsonRequested,
  heatMapLoaded,
});
