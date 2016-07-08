import React from 'react';

import StoryWithImage from 'components/landing-page/stories/story-with-image';
import StoryFactory from 'utils/test/factories/story';
import { unmountComponentSuppressError } from 'utils/test';


describe('StoryWithImage component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render in all screen size', function () {
    StoryWithImage.should.be.renderable();
    StoryWithImage.should.be.responsiveRenderable();
  });

  it('should trigger handleClick when clicked on', function () {
    const story = StoryFactory.build();
    StoryWithImage.should.triggerCallbackWhenClick('handleClick', 'story-with-image', { story: story }, story);
  });

  it('should use the correct style with', function () {
    const story = StoryFactory.build();
    StoryWithImage.should.triggerCallbackWhenClick('handleClick', 'story-with-image', { story: story }, story);
  });
});
