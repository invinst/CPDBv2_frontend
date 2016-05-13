import React from 'react';
import { render } from 'react-dom';
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

render(
  <Provider store={ store }>
    <StyleRoot><LandingPage/></StyleRoot>
  </Provider>,
  document.getElementById('root')
);
