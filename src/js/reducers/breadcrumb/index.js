import { combineReducers } from 'redux';

import breadcrumbItems from './breadcrumb-items';
import breadcrumbMapping from './breadcrumb-mapping';

export default combineReducers({
  breadcrumbItems,
  breadcrumbMapping,
});
