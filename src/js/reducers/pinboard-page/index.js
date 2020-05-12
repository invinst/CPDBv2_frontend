import { combineReducers } from 'redux';

import graphData from './graph-data';
import geographicData from './geographic-data';
import relevantDocuments from './relevant-documents';
import relevantCoaccusals from './relevant-coaccusals';
import relevantComplaints from './relevant-complaints';
import officerItems from './officer-items';
import crItems from './cr-items';
import trrItems from './trr-items';
import pinboard from './pinboard';
import pinboards from './pinboards';
import isShownPinboardsList from './is-shown-pinboards-list';
import focusedItem from './focused-item';
import timelineIdx from './timeline_idx';
import refreshIntervalId from './refresh-interval-id';
import initialRequested from './initial-requested';
import pinnedItemsRequested from './pinned-items-requested';
import pinItemFromPreviewPane from './pin-item-from-preview-pane';
import editModeOn from './edit-mode-on';


export default combineReducers({
  graphData,
  geographicData,
  relevantDocuments,
  relevantCoaccusals,
  relevantComplaints,
  officerItems,
  crItems,
  trrItems,
  pinboard,
  pinboards,
  isShownPinboardsList,
  focusedItem,
  timelineIdx,
  refreshIntervalId,
  initialRequested,
  pinnedItemsRequested,
  pinItemFromPreviewPane,
  editModeOn,
});
