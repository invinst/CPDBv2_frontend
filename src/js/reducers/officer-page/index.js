import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import summary from './summary';
import fullName from './full-name';
import newTimeline from './new-timeline';
import activeTab from './active-tab';
import officerId from './officer-id';
import breadcrumbCachedFullName from './breadcrumb-cached-full-name';
import coaccusals from './coaccusals';
import currentTab from './current-tab';
import editModeOn from './edit-mode-on';
import zipFileUrl from './zip-file-url';


export default combineReducers({
  isRequesting,
  fullName,
  summary,
  activeTab,
  newTimeline,
  officerId,
  breadcrumbCachedFullName,
  coaccusals,
  currentTab,
  editModeOn,
  zipFileUrl,
});
