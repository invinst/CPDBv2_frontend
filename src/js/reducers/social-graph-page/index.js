import { combineReducers } from 'redux';

import graphData from './graph-data';
import graphAllegations from './graph-allegations';
import currentTab from './current-tab';


export default combineReducers({
  graphData,
  graphAllegations,
  currentTab
});
