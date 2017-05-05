import React from 'react';
import { spy } from 'sinon';
import { renderIntoDocument } from 'react-addons-test-utils';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import { MinimapItem } from 'components/officer-page/timeline-page/minimap-item';


describe('MinimapItem component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    MinimapItem.should.be.renderable();
  });

  it('should trigger onClick when clicked on', function () {
    MinimapItem.should.triggerCallbackWhenClick('onClick', 'test--class', { className: 'test--class' });
  });

  it('should trigger onHover when hovering changed', function () {
    const onHover = spy();
    instance = renderIntoDocument(<MinimapItem hovering={ false } onHover={ onHover }/>);
    instance = reRender(<MinimapItem hovering={ true } onHover={ onHover }/>, instance);
    onHover.calledWith(true).should.be.true();
    instance = reRender(<MinimapItem hovering={ false } onHover={ onHover }/>, instance);
    onHover.calledWith(false).should.be.true();
  });
});
