import 'should';
import React from 'react';

import StoryMedium from 'components/stories/story-medium';
import 'utils/test/React';


describe('StoryMedium component', function () {
  it('should render in all screen size', function () {
    StoryMedium.should.be.renderable();
    StoryMedium.should.be.responsiveRenderable();
  });
});
