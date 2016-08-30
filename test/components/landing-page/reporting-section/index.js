import React from 'react';

import ReportingSection from 'components/landing-page/reporting-section';
import configureStore from 'redux-mock-store';
import RawStoryFactory from 'utils/test/factories/raw-story';


// TODO: will try to find a solution for store props
const mockStore = configureStore();
const store = mockStore({
  landingPage: {
    storyApp: {
      stories: [1, 2, 3].map(id => RawStoryFactory.build({ id: id }))
    }
  }
});

describe('ReportingSection component', function () {
  it('should render', function () {
    ReportingSection.should.be.renderable({ store: store, openBottomSheetWithStory: () => {} });
  });
});
