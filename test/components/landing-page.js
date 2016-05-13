import React from 'react';

import LandingPage from 'components/landing-page';
import configureStore from 'redux-mock-store';
import { stories } from 'mock-data';


const mockStore = configureStore();
const store = mockStore({
  storyApp: {
    stories: stories.stories,
    featuredStoryId: stories['feature_story_id']
  }
});

describe('LandingPage component', function () {
  it('should render', function () {
    LandingPage.should.be.renderable({ store: store });
  });
});
