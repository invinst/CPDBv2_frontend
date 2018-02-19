import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import summary from './summary';
import fullName from './full-name';
import complaintsCount from './complaints-count';
import sustainedCount from './sustained-count';
import complaintFacets from './complaint-facets';
import timeline from './timeline';
import activeTab from './active-tab';
import pathname from './pathname';
import socialGraph from './social-graph';
import officerId from './officer-id';
import complaintsByYear from './complaints-by-year';
import breadcrumbCachedFullName from './breadcrumb-cached-full-name';
import percentile from './radar-chart';

export default combineReducers({
  isRequesting,
  fullName,
  summary,
  complaintsCount,
  sustainedCount,
  complaintFacets,
  activeTab,
  pathname,
  timeline,
  socialGraph,
  officerId,
  complaintsByYear,
  breadcrumbCachedFullName,
  percentile
});
