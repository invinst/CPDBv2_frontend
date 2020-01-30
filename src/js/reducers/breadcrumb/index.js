import { combineReducers } from 'redux';

import breadcrumbItems from './breadcrumb-items';
import breadcrumbsMapping from './breadcrumbs-mapping';

export default combineReducers({
  breadcrumbItems,
  breadcrumbsMapping,
});
