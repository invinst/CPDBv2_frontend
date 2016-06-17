import React from 'react';

import ResponsiveTwitterEmbeddedTimeline from 'components/landing-page/responsive-twitter-embedded-timeline';


describe('ResponsiveTwitterEmbeddedTimeline component', function () {
  it('should render', function () {
    ResponsiveTwitterEmbeddedTimeline.should.be.renderable();
    ResponsiveTwitterEmbeddedTimeline.should.be.responsiveRenderable();
  });
});
