import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import summary from './summary';
import fullName from './full-name';
import newTimeline from './new-timeline';
import activeTab from './active-tab';
import pathname from './pathname';
import socialGraph from './social-graph';
import officerId from './officer-id';
import breadcrumbCachedFullName from './breadcrumb-cached-full-name';
import coaccusals from './coaccusals';


export default combineReducers({
  isRequesting,
  fullName,
  summary,
  activeTab,
  pathname,
  newTimeline,
  socialGraph,
  officerId,
  breadcrumbCachedFullName,
  coaccusals,
});
