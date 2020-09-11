import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import landingPage from './landing-page';
import searchPage from './search-page';
import authentication from './authentication';
import crs from './crs';
import officerPage from './officer-page';
import crPage from './cr-page';
import lawsuitPage from './lawsuit-page';
import trrPage from './trr-page';
import documentPage from './document-page';
import unitProfilePage from './unit-profile-page';
import inlineAliasAdminPage from './inline-alias-admin-page';
import genericModal from './generic-modal';
import headers from './headers';
import cms from './cms';
import pageLoading from './page-loading';
import popups from './popups';
import embed from './embed';
import pathname from './pathname';
import documentsOverviewPage from './documents-overview-page';
import documentDeduplicatorPage from './document-deduplicator-page';
import crawlersPage from './crawlers-page';
import socialGraphPage from './social-graph-page';
import pinboardPage from './pinboard-page';
import pinboardAdminPage from './pinboard-admin-page';
import videoModal from './video-modal';
import toasts from './toasts';
import breadcrumb from './breadcrumb';
import pinboardIntroduction from './pinboard-introduction';


export default (history) => combineReducers({
  landingPage,
  searchPage,
  authentication,
  crs,
  router: connectRouter(history),
  officerPage,
  crPage,
  lawsuitPage,
  trrPage,
  documentPage,
  unitProfilePage,
  inlineAliasAdminPage,
  genericModal,
  breadcrumb,
  headers,
  cms,
  pageLoading,
  popups,
  embed,
  pathname,
  documentsOverviewPage,
  documentDeduplicatorPage,
  crawlersPage,
  socialGraphPage,
  pinboardPage,
  pinboardAdminPage,
  pinboardIntroduction,
  videoModal,
  toasts,
});
