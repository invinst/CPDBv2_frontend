import 'should';
import React from 'react';

import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';


describe('ResponsiveFixedWidthComponent', function () {
  it('should render responsively', function () {
    ResponsiveFixedWidthComponent.should.be.renderable();
    ResponsiveFixedWidthComponent.should.be.responsiveRenderable();
  });
});
