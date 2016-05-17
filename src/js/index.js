import React from 'react';
import { render } from 'react-dom';
import TwitterWidgetsLoader from 'twitter-widgets';

import { StyleRoot } from 'radium';
import { Provider } from 'react-redux';

import configureStore from 'store';
import LandingPage from 'components/landing-page';
import 'polyfill';
import { stories } from 'mock-data';
import axiosMockClient from 'utils/axios-mock-client';


const store = configureStore();

// TODO: remove when have real api
axiosMockClient
  .onGet('/stories')
  .reply(200, stories);

TwitterWidgetsLoader.load(function (twttr) {
  global.twttr = twttr;
  render(
    <Provider store={ store }>
      <StyleRoot><LandingPage/></StyleRoot>
    </Provider>,
    document.getElementById('root'));
});
