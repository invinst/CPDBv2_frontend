import React from 'react';

import CollaborateSectionContent from 'components/landing-page/collaborate-section/collaborate-section-content';


describe('CollaborateSectionContent component', function () {
  it('should be renderable', function () {
    CollaborateSectionContent.should.be.renderable();
    CollaborateSectionContent.should.be.responsiveRenderable();
  });
});
