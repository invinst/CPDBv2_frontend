import React from 'react';

import ReportingSectionContent from 'components/landing-page/reporting-section/reporting-section-content';
import StoryFactory from 'utils/test/factories/story';



describe('ReportingSectionContent component', function () {
  const stories = StoryFactory.buildList(3);

  it('should be renderable', function () {
    ReportingSectionContent.should.be.renderable({ stories: stories });
  });

  it('should trigger onStoryClick', function () {
    ReportingSectionContent.should.triggerCallbackWhenClick(
      'onStoryClick', 'story-title', { stories: stories }, stories[0]
    );
  });
});
