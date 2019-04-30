import { combineReducers } from 'redux';

import graphData from './graph-data';
import geographicData from './geographic-data';
import graphAllegations from './graph-allegations';
import currentMainTab from './current-main-tab';
import currentNetworkTab from './current-network-tab';


export default combineReducers({
  graphData,
  geographicData,
  graphAllegations,
  currentMainTab,
  currentNetworkTab,
});
