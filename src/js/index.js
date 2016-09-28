import React from 'react';
import { render } from 'react-dom';
import Perf from 'react-addons-perf';
import TwitterWidgetsLoader from 'twitter-widgets';

import 'babel-polyfill';
import 'polyfill';
import RouterRoot from 'components/router-root';


global.Perf = Perf;

TwitterWidgetsLoader.load(function (twttr) {
  global.twttr = twttr;
  render(
    <RouterRoot />,
    document.getElementById('root'));
});
