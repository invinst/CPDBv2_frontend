import React from 'react';
import { render } from 'react-dom';
import TwitterWidgetsLoader from 'twitter-widgets';

import 'polyfill';
import RouterRoot from 'components/router-root';

if (global.DEVELOPMENT) {
  global.Perf = require('react-addons-perf');
}

TwitterWidgetsLoader.load(function (twttr) {
  global.twttr = twttr;
  render(
    <RouterRoot />,
    document.getElementById('root'));
});
