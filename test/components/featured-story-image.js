import 'should';
import React from 'react';

import FeaturedStoryImage from 'components/featured-story-image';
import 'utils/test/React';


describe('FeaturedStoryImage component', function () {
  it('should render', function () {
    FeaturedStoryImage.should.be.renderable();
  });
});
