import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  Simulate
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import { spy } from 'sinon';
import { unmountComponentSuppressError } from 'utils/test';
import { HoverPoint } from 'components/common/sparklines/hover-point';


describe('Sparkline components', function () {
  let instance;
  const tooltipData = {
    year: 2001,
    count: 1,
    'sustained_count': 0
  };

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render', function () {
    HoverPoint.should.be.renderable();
  });

  it('should have appropriate click handler', function () {
    const spyClickHandler = spy();
    instance = renderIntoDocument(
      <HoverPoint clickHandler={ spyClickHandler } />
    );
    Simulate.click(findDOMNode(instance));
    spyClickHandler.called.should.be.true();
  });

  it('should render tooltip on hover', function () {
    instance = renderIntoDocument(
      <HoverPoint hovering={ true } tooltipData={ tooltipData }/>
    );
    const tooltip = findRenderedDOMComponentWithClass(instance, 'test--sparkline--tooltip');
    tooltip.textContent.should.containEql('1 complaints');
    tooltip.textContent.should.containEql('2001');
  });

});
