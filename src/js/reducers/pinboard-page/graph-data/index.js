import { combineReducers } from 'redux';

import cachedData from './cached-data';
import requesting from './requesting';


export default combineReducers({
  cachedData,
  requesting,
});
