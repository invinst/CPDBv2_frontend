import React, { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { componentCache } from 'redux-breadcrumb-trail';

import AppContainer from 'containers/app-container';
import LandingPageContainer from 'containers/landing-page';
import CollaborationPage from 'components/collaboration-page/collaboration-page';
import FAQPage from 'components/faq-page/faq-page';
import SearchPageContainer from 'containers/search-page-container';
import SearchTermsContainer from 'containers/search-page/search-terms-container';
import OfficerPageContainer from 'containers/officer-page';
import UnitProfilePageContainer from 'containers/unit-profile-page';
import CRPageContainer from 'containers/cr-page';
import InlineAliasAdminContainer from 'containers/inline-alias-admin-container';
import ReportingPage from 'components/reporting-page';
import {
  COLLAB_PATH,
  FAQ_PATH,
  STORIES_PATH,
  SEARCH_PATH,
  SEARCH_TERMS_PATH,
  OFFICER_PATH,
  CR_PATH,
  UNIT_PROFILE_PATH,
  SEARCH_ALIAS_EDIT_PATH,
  INLINE_SEARCH_ALIAS_ADMIN_PATH,
  STANDALONE_CR_PATH, OFFICER_TIMELINE_SUFFIX, OFFICER_SOCIAL_GRAPH_SUFFIX
} from 'utils/constants';
import configureStore from 'store';
import history from 'utils/history';
import OfficerBreadcrumb from 'components/breadcrumbs/officer-breadcrumb';
import UnitBreadcrumb from 'components/breadcrumbs/unit-breadcrumb';
import CRBreadcrumb from 'components/breadcrumbs/cr-breadcrumb';


const store = configureStore();

class RouterRoot extends Component {
  constructor(props) {
    super(props);
    componentCache.set('officer', OfficerBreadcrumb);
    componentCache.set('unit', UnitBreadcrumb);
    componentCache.set('cr', CRBreadcrumb);
  }

  render() {

    const routes = [
      <IndexRoute component={ LandingPageContainer } key='1' breadcrumb='Home'
        onEnter={ () => global.ga('send', 'screenview', { screenName: 'Landing' }) } />,

      <Route path={ STORIES_PATH } component={ ReportingPage } key='2'
        onEnter={ () => global.ga('send', 'screenview', { screenName: 'Stories' }) }>
        <Route path={ ':reportId' } component={ ReportingPage }/>
      </Route>,

      <Route path={ COLLAB_PATH } component={ CollaborationPage } key='3'
        onEnter={ () => global.ga('send', 'screenview', { screenName: 'Collaborate' }) }/>,

      <Route path={ FAQ_PATH } component={ FAQPage } key='4'
        onEnter={ () => global.ga('send', 'screenview', { screenName: 'FAQs' }) }>
        <Route path={ ':faqId' } component={ FAQPage }/>
      </Route>,

      <Route path={ OFFICER_PATH } component={ OfficerPageContainer } key='5'
        breadcrumb={ { componentCacheKey: 'officer' } }>
        <Route path={ OFFICER_TIMELINE_SUFFIX } component={ OfficerPageContainer } key='6'
          useParentBreadcrumb={ true } />
        <Route path={ OFFICER_SOCIAL_GRAPH_SUFFIX } component={ OfficerPageContainer } key='12'
          useParentBreadcrumb={ true } />
      </Route>,

      <Route path={ SEARCH_PATH } component={ SearchPageContainer } key='7' breadcrumb='Search'>
        <Route path={ SEARCH_TERMS_PATH } component={ SearchTermsContainer }/>
      </Route>,

      <Route path={ CR_PATH } component={ CRPageContainer } key='8' breadcrumb={ { componentCacheKey: 'cr' } }/>,
      <Route path={ STANDALONE_CR_PATH } component={ CRPageContainer } key='13'
        breadcrumb={ { componentCacheKey: 'cr' } }/>,

      <Route path={ UNIT_PROFILE_PATH } component={ UnitProfilePageContainer } key='9'
        breadcrumb={ { componentCacheKey: 'unit' } }/>,

      <Route path={ SEARCH_ALIAS_EDIT_PATH } component={ SearchPageContainer } key='10'/>,
      <Route path={ INLINE_SEARCH_ALIAS_ADMIN_PATH } component={ InlineAliasAdminContainer } key='11'/>,
    ];

    return (
      <Provider store={ store }>
        <Router history={ history }>
          <Route path='/(edit)' component={ AppContainer }>
            { routes }
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default DragDropContext(HTML5Backend)(RouterRoot);
