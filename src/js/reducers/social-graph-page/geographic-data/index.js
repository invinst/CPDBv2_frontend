import { combineReducers } from 'redux';

import mapCrsData from './map-crs-data';
import mapTrrsData from './map-trrs-data';
import previewPaneCrsData from './preview-pane-crs-data';
import previewPaneTrrsData from './preview-pane-trrs-data';
import crid from './crid';
import trrId from './trr-id';
import mapCrsDataTotalCount from './map-crs-data-total-count';
import mapTrrsDataTotalCount from './map-trrs-data-total-count';
import isCrsRequested from './is-crs-requested';
import isTrrsRequested from './is-trrs-requested';


export default combineReducers({
  mapCrsData,
  mapTrrsData,
  previewPaneCrsData,
  previewPaneTrrsData,
  crid,
  trrId,
  mapCrsDataTotalCount,
  mapTrrsDataTotalCount,
  isCrsRequested,
  isTrrsRequested,
});
