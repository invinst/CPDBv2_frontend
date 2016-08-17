import React from 'react';

import Stories from 'components/landing-page/stories/stories';
import StoryFactory from 'utils/test/factories/story';
import { unmountComponentSuppressError } from 'utils/test';


describe('Stories component', function () {
  const stories = [1, 2, 3].map((id) => (StoryFactory.build({ id: id })));
  const imageStory = stories[0];
  const noImageStories = stories.slice(1, 3);
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render in all screen size', function () {
    Stories.should.be.renderable({ noImageStories, imageStory });
    Stories.should.be.responsiveRenderable({ noImageStories, imageStory });
  });

  it('should trigger handleStoryClick', function () {
    Stories.should.triggerCallbackWhenClick(
      'handleStoryClick', 'story-with-image', { imageStory: imageStory, noImageStories: noImageStories }, imageStory
    );
    Stories.should.triggerCallbackWhenClick(
      'handleStoryClick', 'article-small', { imageStory: imageStory, noImageStories: noImageStories }, noImageStories[0]
    );
  });
});
