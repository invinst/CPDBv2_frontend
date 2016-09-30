import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from 'components/app';
import LandingPageContainer from 'containers/landing-page';
import CollaborationPage from 'components/collaboration-page/collaboration-page';
import FAQPage from 'components/faq-page/faq-page';
import StoriesPage from 'components/stories-page/stories-page';
import { COLLAB_PATH, FAQ_PATH, STORIES_PATH } from 'utils/constants';


export default class RouterRoot extends Component {

  render() {
    const routes = [
      <IndexRoute component={ LandingPageContainer } key='1'
        onEnter={ () => global.ga('send', 'screenview', { screenName: 'Landing' }) }/>,
      <Route path={ STORIES_PATH } component={ StoriesPage } key='2'
        onEnter={ () => global.ga('send', 'screenview', { screenName: 'Stories' }) }/>,
      <Route path={ COLLAB_PATH } component={ CollaborationPage } key='3'
        onEnter={ () => global.ga('send', 'screenview', { screenName: 'Collaborate' }) }/>,
      <Route path={ FAQ_PATH } component={ FAQPage } key='4'
        onEnter={ () => global.ga('send', 'screenview', { screenName: 'FAQs' }) }/>
    ];
    return (
      <Router history={ browserHistory }>
        <Route path='/(edit)' component={ App }>
          { routes }
        </Route>
      </Router>
    );
  }
}
