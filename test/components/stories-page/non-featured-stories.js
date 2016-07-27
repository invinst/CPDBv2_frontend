import React from 'react';

import NonFeaturedStories from 'components/stories-page/non-featured-stories';
import StoryFactory from 'utils/test/factories/story';
import { unmountComponentSuppressError } from 'utils/test';


describe('NonFeaturedStories component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render in all screen size', function () {
    const stories = StoryFactory.buildList(3);

    NonFeaturedStories.should.be.renderable({ stories });
    NonFeaturedStories.should.be.responsiveRenderable({ stories });
  });
});
