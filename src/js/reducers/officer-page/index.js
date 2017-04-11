import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import summary from './summary';
import fullName from './full-name';
import complaintsCount from './complaints-count';
import sustainedCount from './sustained-count';
import complaintFacets from './complaint-facets';


export default combineReducers({
  isRequesting,
  fullName,
  summary,
  complaintsCount,
  sustainedCount,
  complaintFacets
});
