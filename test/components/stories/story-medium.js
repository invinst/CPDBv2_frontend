import React from 'react';

import StoryMedium from 'components/stories/story-medium';


describe('StoryMedium component', function () {
  it('should render in all screen size', function () {
    StoryMedium.should.be.renderable();
    StoryMedium.should.be.responsiveRenderable();
  });
});
