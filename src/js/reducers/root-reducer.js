import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as breadcrumb } from 'redux-breadcrumb-trail';

import faqPage from './faq-page';
import landingPage from './landing-page';
import searchPage from './search-page';
import authentication from './authentication';
import appContent from './app-content';
import reportingPage from './reporting-page';
import reports from './reports';
import faqs from './faqs';
import crs from './crs';
import bottomSheet from './bottom-sheet';
import officerPage from './officer-page';
import crPage from './cr-page';
import unitProfilePage from './unit-profile-page';
import inlineAliasAdminPage from './inline-alias-admin-page';
import genericModal from './generic-modal';
import headers from './headers';
import cms from './cms';
import breadcrumbsMapping from './breadcrumbs-mapping';


export default combineReducers({
  landingPage,
  searchPage,
  faqPage,
  authentication,
  appContent,
  reportingPage,
  reports,
  faqs,
  crs,
  bottomSheet,
  routing: routerReducer,
  officerPage,
  crPage,
  unitProfilePage,
  inlineAliasAdminPage,
  genericModal,
  breadcrumb,
  breadcrumbsMapping,
  headers,
  cms
});
