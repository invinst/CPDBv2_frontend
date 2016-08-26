import React from 'react';

import CoverageSectionContent from 'components/landing-page/coverage-section/coverage-section-content';
import StoryFactory from 'utils/test/factories/story';



describe('CoverageSectionContent component', function () {
  const stories = StoryFactory.buildList(3);

  it('should be renderable', function () {
    CoverageSectionContent.should.be.renderable({ stories: stories });
  });

  it('should trigger onStoryClick', function () {
    CoverageSectionContent.should.triggerCallbackWhenClick(
      'onStoryClick', 'story-title', { stories: stories }, stories[0]
    );
  });
});
