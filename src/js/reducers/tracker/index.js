import { combineReducers } from 'redux';

import documents from './documents';
import pagination from './pagination';


const tracker = combineReducers({
  documents,
  pagination
});

export default tracker;
