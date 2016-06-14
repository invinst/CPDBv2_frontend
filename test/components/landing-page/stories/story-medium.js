import React from 'react';

import StoryMedium from 'components/landing-page/stories/story-medium';
import StoryFactory from 'utils/test/factories/story';
import { unmountComponentSuppressError } from 'utils/test';


describe('StoryMedium component', function () {
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should render in all screen size', function () {
    StoryMedium.should.be.renderable();
    StoryMedium.should.be.responsiveRenderable();
  });

  it('should trigger onClick when clicked on', function () {
    const story = StoryFactory.build();
    StoryMedium.should.triggerCallbackWhenClick('onClick', 'story-medium', { story: story }, story);
  });
});
