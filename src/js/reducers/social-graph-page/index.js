import { combineReducers } from 'redux';

import graphData from './graph-data';
import currentTab from './current-tab';


export default combineReducers({
  graphData,
  currentTab
});
