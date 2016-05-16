import 'should';
import React from 'react';

import StoryExpanded from 'components/stories/story-expanded';
import 'utils/test/React';


describe('StoryExpanded component', function () {
  it('should be renderable', function () {
    StoryExpanded.should.be.renderable();
  });
});
