import { combineReducers } from 'redux';

import documents from './documents';


const documentDeduplicatorPage = combineReducers({
  documents
});

export default documentDeduplicatorPage;
