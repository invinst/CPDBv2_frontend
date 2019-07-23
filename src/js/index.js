import 'base.css';
import 'draft.css';
import 'font.css';
import 'leaflet.css';
import 'print.css';

import React from 'react';
import { render } from 'react-dom';
import Perf from 'react-addons-perf';

import 'babel-polyfill';
import 'polyfill';
import 'web-animations-js';

import config from 'config';
import RouterRoot from 'components/router-root';

if (config.appEnv === 'dev') {
  global.Perf = Perf;
}

if (config.appEnv === 'live-test') {
  global.disableAnimation = true;
}

if (module.hot) {
  module.hot.accept();
}

render(
  <RouterRoot />,
  document.getElementById('root'));
