import React from 'react';
import { List } from 'immutable';

import LandingPage from 'components/landing-page';
import 'utils/test/React';
import configureStore from 'redux-mock-store';
import { stories } from 'mock-data';


const mockStore = configureStore();
const store = mockStore({ stories: List(stories) });

describe('LandingPage component', function () {
  it('should render', function () {
    LandingPage.should.be.renderable({ store: store });
  });
});
