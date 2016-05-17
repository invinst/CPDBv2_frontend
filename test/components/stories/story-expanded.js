import React from 'react';

import StoryFull from 'components/stories/story-full';
import 'utils/test/React';


describe('StoryFull component', function () {
  it('should be renderable', function () {
    StoryFull.should.be.renderable();
  });
});
