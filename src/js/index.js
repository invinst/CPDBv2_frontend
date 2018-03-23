import React from 'react';
import { render } from 'react-dom';
import Perf from 'react-addons-perf';

import 'babel-polyfill';
import 'polyfill';
import RouterRoot from 'components/router-root';

if (global.DEVELOPMENT) {
  global.Perf = Perf;
}

if (global.LIVE_TEST) {
  global.disableAnimation = true;
}

render(
  <RouterRoot />,
  document.getElementById('root'));
