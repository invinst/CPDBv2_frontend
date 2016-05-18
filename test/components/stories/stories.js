import React from 'react';

import Stories from 'components/stories/stories';
import StoryFactory from 'utils/test/factories/story';


describe('Stories component', function () {
  const stories = [1, 2, 3].map((id) => (StoryFactory.build({ id: id })));
  const featuredStory = stories[0];
  const smallStories = stories.slice(1, 3);

  it('should render in all screen size', function () {
    Stories.should.be.renderable({ smallStories, featuredStory });
    Stories.should.be.responsiveRenderable({ smallStories, featuredStory });
  });
});
