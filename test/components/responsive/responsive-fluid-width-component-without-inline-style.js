import React from 'react';
import MediaQuery from 'react-responsive';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component-without-inline-style';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';


describe('ResponsiveFluidWidthComponentWithoutInlineStyle', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render responsively', function () {
    ResponsiveFluidWidthComponent.should.be.renderable();
    ResponsiveFluidWidthComponent.should.be.responsiveRenderable();
  });

  it('should render MediaQuery with correct width', function () {
    instance = renderIntoDocument(
      <ResponsiveFluidWidthComponent
        minWidthThreshold={ 768 }
        maxWidthThreshold={ 1440 }/>
    );
    const mediaQueries = scryRenderedComponentsWithType(instance, MediaQuery);

    mediaQueries.should.have.length(3);
    mediaQueries[0].props.maxWidth.should.eql(767);

    mediaQueries[1].props.minWidth.should.eql(768);
    mediaQueries[1].props.maxWidth.should.eql(1439);

    mediaQueries[2].props.minWidth.should.eql(1440);
  });
});
