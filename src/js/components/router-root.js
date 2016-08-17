import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from 'components/app';
import LandingPage from 'components/landing-page/landing-page';
import CollaborationPage from 'components/collaboration-page/collaboration-page';
import FAQPage from 'components/faq-page/faq-page';
import StoriesPage from 'components/stories-page/stories-page';
import { COLLAB_PATH, FAQ_PATH, STORIES_PATH } from 'utils/constants';


export default class RouterRoot extends Component {
  render() {
    return (
      <Router history={ browserHistory }>
        <Route path='/' component={ App }>
          <IndexRoute component={ LandingPage }/>
          <Route path={ STORIES_PATH } component={ StoriesPage }/>
          <Route path={ COLLAB_PATH } component={ CollaborationPage }/>
          <Route path={ FAQ_PATH } component={ FAQPage }/>
        </Route>
      </Router>
    );
  }
}
