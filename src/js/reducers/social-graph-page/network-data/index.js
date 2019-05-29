import { combineReducers } from 'redux';

import graphData from './graph-data';
import networkOfficers from './network-officers';
import networkAllegations from './network-allegations';
import currentNetworkTab from './current-network-tab';
import officerId from './officer-id';


export default combineReducers({
  graphData,
  networkOfficers,
  networkAllegations,
  currentNetworkTab,
  officerId
});
