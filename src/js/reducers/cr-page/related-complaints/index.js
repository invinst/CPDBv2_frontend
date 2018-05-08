import { combineReducers } from 'redux';

import relatedByCategory from './related-by-category';
import relatedByOfficer from './related-by-officer';

export default combineReducers({
  relatedByCategory,
  relatedByOfficer
});
