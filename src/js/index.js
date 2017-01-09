import React from 'react';
import { render } from 'react-dom';
import TwitterWidgetsLoader from 'twitter-widgets';
import Perf from 'react-addons-perf';

import 'babel-polyfill';
import 'polyfill';
import RouterRoot from 'components/router-root';

global.Perf = Perf;
TwitterWidgetsLoader.load(() => {});

render(
  <RouterRoot />,
  document.getElementById('root'));
