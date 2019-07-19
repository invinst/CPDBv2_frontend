import { combineReducers } from 'redux';

import mapCrsData from './map-crs-data';
import mapTrrsData from './map-trrs-data';
import requesting from './requesting';
import mapCrsDataTotalCount from './map-crs-data-total-count';
import mapTrrsDataTotalCount from './map-trrs-data-total-count';
import clearAllMarkers from './clear-all-markers';


export default combineReducers({
  mapCrsData,
  mapTrrsData,
  requesting,
  mapCrsDataTotalCount,
  mapTrrsDataTotalCount,
  clearAllMarkers,
});
