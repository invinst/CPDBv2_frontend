import 'should';
import React from 'react';

import Stories from 'components/stories/stories';
import 'utils/test/React';


describe('Stories component', function () {
  it('should render in all screen size', function () {
    Stories.should.be.renderable();
    Stories.should.be.responsiveRenderable();
  });
});
