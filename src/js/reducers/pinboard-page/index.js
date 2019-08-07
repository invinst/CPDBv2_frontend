import { combineReducers } from 'redux';

import graphData from './graph-data';
import geographicData from './geographic-data';
import currentTab from './current-tab';
import relevantDocuments from './relevant-documents';
import relevantCoaccusals from './relevant-coaccusals';
import relevantComplaints from './relevant-complaints';
import officerItems from './officer-items';
import crItems from './cr-items';
import trrItems from './trr-items';
import redirect from './redirect';
import pinboard from './pinboard';
import focusedItem from './focused-item';
import timelineIdx from './timeline_idx';
import refreshIntervalId from './refresh-interval-id';
import initialRequested from './initial-requested';
import pinItemFromPreviewPane from './pin-item-from-preview-pane';
import editModeOn from './edit-mode-on';


export default combineReducers({
  graphData,
  geographicData,
  currentTab,
  relevantDocuments,
  relevantCoaccusals,
  relevantComplaints,
  officerItems,
  crItems,
  trrItems,
  redirect,
  pinboard,
  focusedItem,
  timelineIdx,
  refreshIntervalId,
  initialRequested,
  pinItemFromPreviewPane,
  editModeOn,
});
