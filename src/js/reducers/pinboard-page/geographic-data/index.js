import { combineReducers } from 'redux';

import mapCrsData from './map-crs-data';
import mapTrrsData from './map-trrs-data';
import crsRequesting from './crs-requesting';
import trrsRequesting from './trrs-requesting';
import mapCrsDataTotalCount from './map-crs-data-total-count';
import mapTrrsDataTotalCount from './map-trrs-data-total-count';
import clearAllMarkers from './clear-all-markers';


export default combineReducers({
  mapCrsData,
  mapTrrsData,
  crsRequesting,
  trrsRequesting,
  mapCrsDataTotalCount,
  mapTrrsDataTotalCount,
  clearAllMarkers,
});
