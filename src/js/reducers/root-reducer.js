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
import documentPage from './document-page';
import unitProfilePage from './unit-profile-page';
import inlineAliasAdminPage from './inline-alias-admin-page';
import genericModal from './generic-modal';
import headers from './headers';
import cms from './cms';
import breadcrumbsMapping from './breadcrumbs-mapping';
import pageLoading from './page-loading';
import popups from './popups';
import embed from './embed';
import pathname from './pathname';
import documentsOverviewPage from './documents-overview-page';
import documentDeduplicatorPage from './document-deduplicator-page';
import crawlersPage from './crawlers-page';


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
  documentPage,
  unitProfilePage,
  inlineAliasAdminPage,
  genericModal,
  breadcrumb,
  breadcrumbsMapping,
  headers,
  cms,
  pageLoading,
  popups,
  embed,
  pathname,
  documentsOverviewPage,
  documentDeduplicatorPage,
  crawlersPage
});
