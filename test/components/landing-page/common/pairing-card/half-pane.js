import React from 'react';
import { spy } from 'sinon';

import { renderIntoDocument } from 'react-addons-test-utils';
import { unmountComponentSuppressError, reRender } from 'utils/test';
import HalfPane from 'components/landing-page/common/pairing-card/half-pane';


describe('HalfPane component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    HalfPane.should.be.renderable();
  });

  it('should call onHovering when hovering props changed', function () {
    const onHoveringStub = spy();
    instance = renderIntoDocument(
      <HalfPane onHovering={ onHoveringStub } hovering={ false } />
    );

    reRender(<HalfPane onHovering={ onHoveringStub } hovering={ true } />, instance);
    onHoveringStub.calledWith(true).should.be.true();
  });
});
