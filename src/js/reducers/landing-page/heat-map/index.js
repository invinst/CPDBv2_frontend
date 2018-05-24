import { combineReducers } from 'redux';

import citySummary from './city-summary';
import communities from './communities';
import clusterGeoJson from './cluster-geo-json';


export default combineReducers({
  citySummary,
  communities,
  clusterGeoJson
});
