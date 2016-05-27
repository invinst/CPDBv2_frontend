import React from 'react';

import StorySmall from 'components/stories/story-small';
import StoryFactory from 'utils/test/factories/story';


describe('StorySmall component', function () {
  it('should be renderable', function () {
    StorySmall.should.be.renderable({ story: StoryFactory.build() });
  });

  it('should trigger onClick when clicked on', function () {
    const story = StoryFactory.build();
    StorySmall.should.triggerCallbackWhenClick('onClick', 'article-small', { story: story }, story);
  });
});
