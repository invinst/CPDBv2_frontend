import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';
import { stub } from 'sinon';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import D3Elements from 'components/officer-page/social-graph-page/d3-elements';


describe('D3Elements component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should update element after mount', function () {
    const method = stub(D3Elements.prototype, 'updateElement');
    instance = renderIntoDocument(
      <D3Elements/>
    );
    method.calledOnce.should.be.true();
    method.restore();
  });

  it('should update element after update', function () {
    const method = stub(D3Elements.prototype, 'updateElement');
    instance = renderIntoDocument(
      <D3Elements/>
    );
    reRender(<D3Elements text={ () => '123' }/>, instance);
    method.calledTwice.should.be.true();
    method.restore();
  });
});
