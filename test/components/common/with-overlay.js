import React from 'react';
import should from 'should';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  Simulate,
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import withOverlay from 'components/common/with-overlay';
import Children from 'utils/test/components/children';


describe('withOverlay component', function () {
  let instance;
  const WithOverlayComponent = withOverlay(Children);

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render overlay and component if isShown is true', function () {
    const handleCloseSpy = spy();
    instance = renderIntoDocument(
      <WithOverlayComponent isShown={ true } handleClose={ handleCloseSpy } attr='attr' />
    );

    const content = findRenderedComponentWithType(instance, Children);
    content.props.isShown.should.be.true();
    content.props.attr.should.equal('attr');
    should(content.props.handleClose).be.undefined();

    const overlay = findRenderedDOMComponentWithClass(instance, 'overlay');
    overlay.getAttribute('aria-hidden').should.equal('false');

    Simulate.click(overlay);
    handleCloseSpy.should.be.called();
  });

  it('should not render overlay isShown is false', function () {
    const handleCloseSpy = spy();
    instance = renderIntoDocument(
      <WithOverlayComponent isShown={ false } handleClose={ handleCloseSpy } attr='attr' />
    );

    const content = findRenderedComponentWithType(instance, Children);
    content.props.isShown.should.be.false();
    content.props.attr.should.equal('attr');
    should(content.props.handleClose).be.undefined();

    const overlay = findRenderedDOMComponentWithClass(instance, 'overlay');
    overlay.getAttribute('aria-hidden').should.equal('true');
  });

  it('should add and remove body-not-scrollable to body when isShown changes', function () {
    instance = renderIntoDocument(
      <WithOverlayComponent isShown={ false } />
    );

    instance = reRender(
      <WithOverlayComponent isShown={ true } />,
      instance,
    );

    document.body.classList.contains('body-not-scrollable').should.be.true();

    reRender(
      <WithOverlayComponent isShown={ false } />,
      instance,
    );

    document.body.classList.contains('body-not-scrollable').should.be.false();
  });

  it('should remove body-not-scrollable from body when unmount component', function () {
    instance = renderIntoDocument(
      <WithOverlayComponent isShown={ false } />
    );

    instance = reRender(
      <WithOverlayComponent isShown={ true } />,
      instance,
    );

    document.body.classList.contains('body-not-scrollable').should.be.true();

    unmountComponentSuppressError(instance);

    document.body.classList.contains('body-not-scrollable').should.be.false();
  });
});
