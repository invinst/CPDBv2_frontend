import React from 'react';

import Stories from 'components/landing-page/stories/stories';
import StoryFactory from 'utils/test/factories/story';
import { unmountComponentSuppressError } from 'utils/test';


describe('Stories component', function () {
  const stories = [1, 2, 3].map((id) => (StoryFactory.build({ id: id })));
  const featuredStory = stories[0];
  const smallStories = stories.slice(1, 3);
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should render in all screen size', function () {
    Stories.should.be.renderable({ smallStories, featuredStory });
    Stories.should.be.responsiveRenderable({ smallStories, featuredStory });
  });

  it('should trigger onStoryClick', function () {
    Stories.should.triggerCallbackWhenClick(
      'onStoryClick', 'story-medium', { featuredStory: featuredStory, smallStories: smallStories }, featuredStory
    );
    Stories.should.triggerCallbackWhenClick(
      'onStoryClick', 'article-small', { featuredStory: featuredStory, smallStories: smallStories }, smallStories[0]
    );
  });
});
