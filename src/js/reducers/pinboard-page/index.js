import { combineReducers } from 'redux';

import graphData from './graph-data';
import geographicData from './geographic-data';
import currentTab from './current-tab';
import redirection from './redirection';


export default combineReducers({
  graphData,
  geographicData,
  currentTab,
  redirection,
});
