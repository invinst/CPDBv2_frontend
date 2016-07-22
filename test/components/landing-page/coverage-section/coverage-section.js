import React from 'react';

import CoverageSection from 'components/landing-page/coverage-section/coverage-section';
import configureStore from 'redux-mock-store';
import RawStoryFactory from 'utils/test/factories/raw-story';
import PaginationFactory from 'utils/test/factories/pagination';


// TODO: will try to find a solution for store props
const mockStore = configureStore();
const store = mockStore({
  landingPage: {
    storyApp: {
      stories: PaginationFactory.build({ results: [1, 2, 3].map(id => RawStoryFactory.build({ id: id })) }),
      featuredStoryId: 1
    }
  }
});

describe('CoverageSection component', function () {
  it('should render', function () {
    CoverageSection.should.be.renderable({ store: store });
  });
});
