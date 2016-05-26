import React from 'react';
import { render } from 'react-dom';
import TwitterWidgetsLoader from 'twitter-widgets';

import { Provider } from 'react-redux';

import configureStore from 'store';
import 'polyfill';
import RootComponent from 'components/root';


const store = configureStore();

TwitterWidgetsLoader.load(function (twttr) {
  global.twttr = twttr;
  render(
    <Provider store={ store }>
      <RootComponent/>
    </Provider>,
    document.getElementById('root'));
});
