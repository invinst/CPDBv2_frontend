import React from 'react';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';


describe('ResponsiveFluidWidthComponent', function () {
  it('should render responsively', function () {
    ResponsiveFluidWidthComponent.should.be.renderable();
    ResponsiveFluidWidthComponent.should.be.responsiveRenderable();
  });
});
