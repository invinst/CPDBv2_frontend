import { combineReducers } from 'redux';

import activityGrid from './activity-grid';
import heatMap from './heat-map';


export default combineReducers({
  activityGrid,
  heatMap
});
