import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import summary from './summary';
import fullName from './full-name';
import complaintsCount from './complaints-count';
import complaintFacets from './complaint-facets';
import timeline from './timeline';
import officerId from './officer-id';


export default combineReducers({
  isRequesting,
  fullName,
  summary,
  complaintsCount,
  complaintFacets,
  timeline,
  officerId
});
