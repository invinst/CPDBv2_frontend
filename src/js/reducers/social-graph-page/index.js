import { combineReducers } from 'redux';

import networkData from './network-data';
import geographicData from './geographic-data';
import currentMainTab from './current-main-tab';


export default combineReducers({
  networkData,
  geographicData,
  currentMainTab,
});
