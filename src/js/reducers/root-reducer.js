import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as breadcrumb } from 'redux-breadcrumb-trail';

import landingPage from './landing-page';
import searchPage from './search-page';
import authentication from './authentication';
import appContent from './app-content';
import crs from './crs';
import officerPage from './officer-page';
import crPage from './cr-page';
import trrPage from './trr-page';
import unitProfilePage from './unit-profile-page';
import inlineAliasAdminPage from './inline-alias-admin-page';
import genericModal from './generic-modal';
import headers from './headers';
import cms from './cms';
import breadcrumbsMapping from './breadcrumbs-mapping';
import pageLoading from './page-loading';
import popups from './popups';


export default combineReducers({
  landingPage,
  searchPage,
  authentication,
  appContent,
  crs,
  routing: routerReducer,
  officerPage,
  crPage,
  trrPage,
  unitProfilePage,
  inlineAliasAdminPage,
  genericModal,
  breadcrumb,
  breadcrumbsMapping,
  headers,
  cms,
  pageLoading,
  popups,
});
