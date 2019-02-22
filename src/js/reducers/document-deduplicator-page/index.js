import { combineReducers } from 'redux';

import documents from './documents';
import pagination from './pagination';
import documentsOrder from './documents-order';


const documentDeduplicatorPage = combineReducers({
  documents,
  pagination,
  documentsOrder,
});

export default documentDeduplicatorPage;
