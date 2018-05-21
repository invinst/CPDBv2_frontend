import React, { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import AppContainer from 'containers/app-container';
import LandingPageContainer from 'containers/landing-page';
import CollaborationPage from 'components/collaboration-page/collaboration-page';
import SearchPageContainer from 'containers/search-page-container';
import SearchTermsContainer from 'containers/search-page/search-terms-container';
import OfficerPageContainer from 'containers/officer-page';
import UnitProfilePageContainer from 'containers/unit-profile-page';
import CRPageContainer from 'containers/cr-page';
import InlineAliasAdminContainer from 'containers/inline-alias-admin-container';
import {
  COLLAB_PATH,
  SEARCH_PATH,
  SEARCH_TERMS_PATH,
  OFFICER_PATH,
  CR_PATH_SUFFIX,
  UNIT_PROFILE_PATH,
  SEARCH_ALIAS_EDIT_PATH,
  INLINE_SEARCH_ALIAS_ADMIN_PATH,
  STANDALONE_CR_PATH,
  OFFICER_SOCIAL_GRAPH_SUFFIX
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
            component={ AppContainer }>
            <IndexRoute
              component={ LandingPageContainer }
              breadcrumb='cpdp'/>
            <Route
              path={ COLLAB_PATH }
              component={ CollaborationPage }/>
            <Route
              path={ OFFICER_PATH }
              component={ OfficerPageContainer }
              breadcrumb={ BreadcrumbItemContainer }>
              <Route
                path={ OFFICER_SOCIAL_GRAPH_SUFFIX }
                component={ OfficerPageContainer }
                useParentBreadcrumb={ true } />
            </Route>
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
              path={ UNIT_PROFILE_PATH }
              component={ UnitProfilePageContainer }
              breadcrumb={ BreadcrumbItemContainer }/>
            <Route
              path={ SEARCH_ALIAS_EDIT_PATH }
              component={ SearchPageContainer }/>
            <Route
              path={ INLINE_SEARCH_ALIAS_ADMIN_PATH }
              component={ InlineAliasAdminContainer }/>
          </Route>
        </Router>
      </Provider>
    );
  }
}
