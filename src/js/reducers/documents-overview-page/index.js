import { combineReducers } from 'redux';

import documents from './documents';
import pagination from './pagination';
import documentsOrder from './documents-order';
import isRequesting from './is-requesting';


const documentsOverviewPage = combineReducers({
  documents,
  pagination,
  documentsOrder,
  isRequesting,
});

export default documentsOverviewPage;
