import React from 'react';
import 'should';

import LandingPage from 'components/landing-page';
import configureStore from 'redux-mock-store';
import { OfficerCardFactory } from 'utils/test/factories/activity-grid';

const mockStore = configureStore();
const store = mockStore({
  landingPage: {
    activityGrid: {
      cards: [
        OfficerCardFactory.build(),
        OfficerCardFactory.build(),
        OfficerCardFactory.build(),
      ]
    }
  }
});

describe('LandingPage component', function () {
  it('should render', function () {
    LandingPage.should.be.responsiveRenderable({ store: store, requestLandingPage: () => {} });
  });
});
