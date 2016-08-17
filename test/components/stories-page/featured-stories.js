import React from 'react';

import { unmountComponentSuppressError } from 'utils/test';
import StoryFactory from 'utils/test/factories/story';
import FeaturedStories from 'components/stories-page/featured-stories';


describe('FeaturedStories component', function () {
  const stories = StoryFactory.buildList(3);
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    FeaturedStories.should.be.renderable({ stories: stories, onStoryClick: () => {} });
    FeaturedStories.should.be.responsiveRenderable({ stories: stories, onStoryClick: () => {} });
  });
});
