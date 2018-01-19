import { combineReducers } from 'redux';

import citySummary from './city-summary';
import communities from './communities';


export default combineReducers({
  citySummary,
  communities
});
