import React from 'react';
import { render } from 'react-dom';
import { StyleRoot } from 'radium';
import { Provider } from 'react-redux';
import MockAdapter from 'axios-mock-adapter';

import axiosClient from 'utils/axios-client';
import configureStore from 'store';
import LandingPage from 'components/landing-page';
import 'polyfill';
import { stories } from 'mock-data';


const store = configureStore();

// TODO: remove when have real api
const mock = new MockAdapter(axiosClient);
mock
  .onGet('/stories')
  .reply(200, { stories: stories });

render(
  <Provider store={ store }>
    <StyleRoot><LandingPage/></StyleRoot>
  </Provider>,
  document.getElementById('root')
);
