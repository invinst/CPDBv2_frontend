import 'should';
import React from 'react';

import TwitterEmbeddedTimeline from 'components/twitter-embedded-timeline';
import 'utils/test/React';


describe('TwitterEmbeddedTimeline component', function () {
  it('should render', function () {
    TwitterEmbeddedTimeline.should.be.renderable();
  });
});
