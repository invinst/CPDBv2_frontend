import React, { Component } from 'react';
import { Router, Route, IndexRoute, Redirect } from 'react-router';
import { Provider } from 'react-redux';

import AppContainer from 'containers/app-container';
import LandingPageContainer from 'containers/landing-page';
import CollaborationPage from 'components/collaboration-page/collaboration-page';
import SearchPageContainer from 'containers/search-page';
import SearchTermsContainer from 'containers/search-page/search-terms-container';
import OfficerPageContainer from 'containers/officer-page';
import UnitProfilePageContainer from 'containers/unit-profile-page';
import CRPageContainer from 'containers/cr-page';
import TRRPageContainer from 'containers/trr-page';
import DocumentPageContainer from 'containers/document-page';
import InlineAliasAdminContainer from 'containers/inline-alias-admin-container';
import CrawlersContainer from 'containers/crawlers-page';
import HeatMapContainer from 'containers/embeddable-heat-map';
import EmbedTopOfficersPage from 'components/landing-page/embed/top-officers-page';
import EmbedOfficersContainer from 'containers/embed/officers';
import DocumentDeduplicatorContainer from 'containers/document-deduplicator-page';
import DocumentsOverviewContainer from 'containers/documents-overview-page';
import SocialGraphContainer from 'containers/social-graph-page';
import {
  COLLAB_PATH,
  SEARCH_PATH,
  SEARCH_TERMS_PATH,
  OFFICER_PATH,
  CR_PATH_SUFFIX,
  TTR_PATH,
  UNIT_PROFILE_PATH,
  SEARCH_ALIAS_EDIT_PATH,
  INLINE_SEARCH_ALIAS_ADMIN_PATH,
  STANDALONE_CR_PATH,
  CRAWLERS_PATH,
  DOCUMENT_PATH,
  EMBED_MAP_PATH,
  EMBED_TOP_OFFICERS_PATH,
  EMBED_OFFICERS_PATH,
  TRACKER_ALL_DOCUMENTS_PATH,
  TRACKER_DOCUMENTS_OVERVIEW_PATH,
  SOCIAL_GRAPH_PATH,
} from 'utils/constants';
import configureStore from 'store';
import history from 'utils/history';
import BreadcrumbItemContainer from 'containers/breadcrumb-item';


const store = configureStore();

export default class RouterRoot extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router history={ history }>
          <Route
            path='/(edit)'
            breadcrumbKey='/'
            component={ AppContainer }>
            <IndexRoute
              component={ LandingPageContainer }
              breadcrumbKey='/'
              breadcrumb='cpdp'/>
            <Route
              path={ COLLAB_PATH }
              component={ CollaborationPage }/>
            <Route
              path={ OFFICER_PATH }
              component={ OfficerPageContainer }
              breadcrumb={ BreadcrumbItemContainer } />
            <Route
              path={ SEARCH_PATH }
              component={ SearchPageContainer }
              breadcrumb='Search'>
              <Route
                path={ SEARCH_TERMS_PATH }
                component={ SearchTermsContainer }
                useParentBreadcrumb={ true }/>
            </Route>
            <Route
              path={ STANDALONE_CR_PATH }
              component={ CRPageContainer }
              breadcrumb={ BreadcrumbItemContainer }>
              <Route
                path={ CR_PATH_SUFFIX }
                component={ CRPageContainer }
                useParentBreadcrumb={ true }/>
            </Route>
            <Route
              path={ DOCUMENT_PATH }
              component={ DocumentPageContainer }
              breadcrumb={ BreadcrumbItemContainer }/>
            <Route
              path={ TTR_PATH }
              component={ TRRPageContainer }
              breadcrumb={ BreadcrumbItemContainer }/>
            <Route
              path={ UNIT_PROFILE_PATH }
              component={ UnitProfilePageContainer }
              breadcrumb={ BreadcrumbItemContainer }/>
            <Route
              path={ SEARCH_ALIAS_EDIT_PATH }
              component={ SearchPageContainer }/>
            <Route
              path={ INLINE_SEARCH_ALIAS_ADMIN_PATH }
              component={ InlineAliasAdminContainer }/>
            <Route
              path={ CRAWLERS_PATH }
              component={ CrawlersContainer }
              breadcrumb='Crawler Tracker'/>
            <Route
              path={ EMBED_MAP_PATH }
              component={ HeatMapContainer }/>
            <Route
              path={ EMBED_TOP_OFFICERS_PATH }
              component={ EmbedTopOfficersPage }/>
            <Route
              path={ EMBED_OFFICERS_PATH }
              component={ EmbedOfficersContainer }/>
            <Route
              path={ TRACKER_ALL_DOCUMENTS_PATH }
              component={ DocumentDeduplicatorContainer }
              breadcrumb={ BreadcrumbItemContainer }/>
            <Route
              path={ SOCIAL_GRAPH_PATH }
              component={ SocialGraphContainer }/>
            <Route
              path={ TRACKER_DOCUMENTS_OVERVIEW_PATH }
              component={ DocumentsOverviewContainer }
              breadcrumb='Documents Overview'/>
            <Redirect from='*' to='/'/>
          </Route>
        </Router>
      </Provider>
    );
  }
}
