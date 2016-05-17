import React from 'react';
import { render } from 'react-dom';
import TwitterWidgetsLoader from 'twitter-widgets';

import { Provider } from 'react-redux';

import configureStore from 'store';
import 'polyfill';
import { stories } from 'mock-data';
import axiosMockClient from 'utils/axios-mock-client';
import RootComponent from 'components/root';


const store = configureStore();

// TODO: remove when have real api
axiosMockClient
  .onGet('/stories')
  .reply(200, stories);

TwitterWidgetsLoader.load(function (twttr) {
  global.twttr = twttr;
  render(
    <Provider store={ store }>
      <RootComponent/>
    </Provider>,
    document.getElementById('root'));
});
