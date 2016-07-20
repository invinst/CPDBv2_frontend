import React from 'react';

import TwitterSectionContent from 'components/landing-page/twitter-section/twitter-section-content';


describe('TwitterSectionContent component', function () {
  it('should render', function () {
    TwitterSectionContent.should.be.renderable();
    TwitterSectionContent.should.be.responsiveRenderable();
  });
});
