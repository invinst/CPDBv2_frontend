import { combineReducers } from 'redux';

import graphData from './graph-data';
import networkOfficers from './network-officers';
import networkAllegations from './network-allegations';
import currentNetworkTab from './current-network-tab';
import officerId from './officer-id';
import timelineIdx from './timeline-idx';
import refreshIntervalId from './refresh-interval-id';
import timelineIdxTriggerChange from './timeline-idx-trigger-change';


export default combineReducers({
  graphData,
  networkOfficers,
  networkAllegations,
  currentNetworkTab,
  officerId,
  timelineIdx,
  refreshIntervalId,
  timelineIdxTriggerChange
});
