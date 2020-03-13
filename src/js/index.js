import 'base.css';
import 'draft.css';
import 'font.css';
import 'leaflet.css';
import 'print.css';
import 'vendors/modal-video.scss';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import 'babel-polyfill';
import 'polyfill';
import 'web-animations-js';

import config from 'config';
import AppContainer from 'containers/app-container';
import configureStore from 'store';
import browserHistory from 'utils/history';


const store = configureStore();

if (config.appEnv === 'integration-test') {
  global.disableAnimation = true;
}

if (module.hot) {
  module.hot.accept();
}

render(
  <Provider store={ store }>
    <ConnectedRouter history={ browserHistory }>
      <AppContainer />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));
