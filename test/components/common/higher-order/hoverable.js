import React, { Component } from 'react';
import {
  renderIntoDocument, findRenderedComponentWithType, Simulate, findRenderedDOMComponentWithTag
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Hoverable from 'components/common/higher-order/hoverable';
import isMobile from 'ismobilejs';


describe('Hoverable component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  class Dummy extends Component {
    render() {
      return <div/>;
    }
  }
  const HoverableDummy = Hoverable(Dummy);

  it('should pass hovering to children', function () {
    instance = renderIntoDocument(<HoverableDummy/>);
    const dummy = findRenderedComponentWithType(instance, Dummy);
    dummy.props.hovering.should.be.false();
  });

  it('should pass hovering equal true to children when hovered', function () {
    instance = renderIntoDocument(<HoverableDummy onMouseOver={ () => {} } onMouseOut={ () => {} }/>);
    const span = findRenderedDOMComponentWithTag(instance, 'span');
    Simulate.mouseOver(span);
    const dummy = findRenderedComponentWithType(instance, Dummy);
    dummy.props.hovering.should.be.true();
    Simulate.mouseOut(span);
    dummy.props.hovering.should.be.false();
  });

  function withIsMobileStubbed(val, callback) {
    const temp = isMobile.any;
    isMobile.any = val;
    callback();
    isMobile.any = temp;
  }

  it('should not turn on hovering on mobile', function () {
    withIsMobileStubbed(true, () => {
      instance = renderIntoDocument(<HoverableDummy/>);
      const span = findRenderedDOMComponentWithTag(instance, 'span');
      Simulate.mouseOver(span);
      const dummy = findRenderedComponentWithType(instance, Dummy);
      dummy.props.hovering.should.be.false();
      Simulate.mouseOut(span);
      dummy.props.hovering.should.be.false();
    });
  });
});
