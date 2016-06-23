import React from 'react';

import StoryNoImage from 'components/landing-page/stories/story-no-image';
import StoryFactory from 'utils/test/factories/story';


describe('StoryNoImage component', function () {
  it('should be renderable', function () {
    StoryNoImage.should.be.renderable({ story: StoryFactory.build() });
  });

  it('should trigger handleClick when clicked on', function () {
    const story = StoryFactory.build();
    StoryNoImage.should.triggerCallbackWhenClick('handleClick', 'article-small', { story: story }, story);
  });
});
