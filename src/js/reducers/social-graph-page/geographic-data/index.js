import { combineReducers } from 'redux';

import mapData from './map-data';
import previewPaneData from './preview-pane-data';
import crid from './crid';
import trrId from './trr-id';


export default combineReducers({
  mapData,
  previewPaneData,
  crid,
  trrId,
});
