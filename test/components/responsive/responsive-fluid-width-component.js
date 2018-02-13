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

  it('should render MediaQuery with correct style', function () {
    instance = renderIntoDocument(
      <ResponsiveFluidWidthComponent
        minimumStyle={ { min: 'min' } }
        mediumStyle={ { med: 'med' } }
        maximumStyle={ { max: 'max' } }
      />
    );
    const mediaQueries = scryRenderedComponentsWithType(instance, MediaQuery);

    mediaQueries[0].props.children.props.style.should.eql({ min: 'min' });
    mediaQueries[1].props.children.props.style.should.eql({ med: 'med' });
    mediaQueries[2].props.children.props.style.should.eql({ max: 'max' });
  });
});
