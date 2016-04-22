import 'should';
import React from 'react';

import StorySmall from 'components/story-small';
import 'utils/test/React';


describe('StorySmall component', function () {
  it('should render', function () {
    StorySmall.should.be.renderable();
  });
});
