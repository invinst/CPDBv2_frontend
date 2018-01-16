import React from 'react';
import MediaQuery from 'react-responsive';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import { scryRenderedComponentsWithType, renderIntoDocument } from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';
import scrollBarWidth from 'utils/scrollbar-width';


describe('ResponsiveFluidWidthComponent', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render responsively', function () {
    ResponsiveFluidWidthComponent.should.be.renderable();
    ResponsiveFluidWidthComponent.should.be.responsiveRenderable();
  });

  it('should take scrollbar width into account in fixed width mode', function () {
    instance = renderIntoDocument(
      <ResponsiveFluidWidthComponent />
    );
    const nodes = scryRenderedComponentsWithType(instance, MediaQuery);
    const node = nodes.filter(n => n.props.maxWidth === 767)[0];
    const div = node.props.children;
    div.props.style.width.should.eql(`${767 - scrollBarWidth}px`);
  });
});
