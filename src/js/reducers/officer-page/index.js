import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import summary from './summary';
import fullName from './full-name';
import timeline from './timeline';
import activeTab from './active-tab';
import pathname from './pathname';
import socialGraph from './social-graph';
import officerId from './officer-id';
import breadcrumbCachedFullName from './breadcrumb-cached-full-name';
import metrics from './metrics';
import percentile from './radar-chart';


export default combineReducers({
  isRequesting,
  fullName,
  summary,
  activeTab,
  pathname,
  timeline,
  socialGraph,
  officerId,
  breadcrumbCachedFullName,
  metrics,
  percentile
});
