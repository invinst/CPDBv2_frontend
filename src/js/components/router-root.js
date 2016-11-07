import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from 'components/app';
import LandingPageContainer from 'containers/landing-page';
import CollaborationPage from 'components/collaboration-page/collaboration-page';
import FAQPage from 'components/faq-page/faq-page';
import StoriesPage from 'components/stories-page/stories-page';
import AutoCompleteContainer from 'containers/landing-page/autocomplete-container';
import { COLLAB_PATH, FAQ_PATH, STORIES_PATH } from 'utils/constants';


export default class RouterRoot extends Component {
  render() {
    return (
      <Router history={ browserHistory }>
        <Route path='/' component={ App }>
          <IndexRoute component={ LandingPageContainer }
            onEnter={ () => global.ga('send', 'screenview', { screenName: 'Landing' }) }/>
          <Route path={ STORIES_PATH } component={ StoriesPage }
            onEnter={ () => global.ga('send', 'screenview', { screenName: 'Stories' }) }/>
          <Route path={ COLLAB_PATH } component={ CollaborationPage }
            onEnter={ () => global.ga('send', 'screenview', { screenName: 'Collaborate' }) }/>
          <Route path={ FAQ_PATH } component={ FAQPage }
            onEnter={ () => global.ga('send', 'screenview', { screenName: 'FAQs' }) }/>
          <Route path='search' component={ AutoCompleteContainer }
            onEnter={ () => global.ga('send', 'screenview', { screenName: 'FAQs' }) }/>
        </Route>
      </Router>
    );
  }
}
