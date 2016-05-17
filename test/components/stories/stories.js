import React from 'react';

import Stories from 'components/stories/stories';
import StoryFactory from 'utils/test/factories/story';


describe('Stories component', function () {
  const stories = [1, 2, 3].map((id) => (StoryFactory.build({ id: id })));

  it('should render in all screen size', function () {
    Stories.should.be.renderable({ stories: stories, featuredStoryId: 1 });
    Stories.should.be.responsiveRenderable({ stories: stories, featuredStoryId: 1 });
  });
});
