import React from 'react';

import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';


describe('ResponsiveStyleComponent component', function () {
  it('should render in all screen size', function () {
    ResponsiveStyleComponent.should.be.renderable();
    ResponsiveStyleComponent.should.be.responsiveRenderable();
  });
});
