import React from 'react';

import AboutSectionContent from 'components/landing-page/about-section/about-section-content';


describe('AboutSectionContent component', function () {
  it('should render', function () {
    AboutSectionContent.should.be.renderable();
    AboutSectionContent.should.be.responsiveRenderable();
  });
});
