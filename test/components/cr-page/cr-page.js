import React from 'react';
import { spy } from 'sinon';
import { renderIntoDocument } from 'react-addons-test-utils';

import CRPage from 'components/cr-page';
import { unmountComponentSuppressError, reRender } from 'utils/test';


describe('CRPage component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should trigger fetchCR on initial', function () {
    const fetchCR = spy();
    instance = renderIntoDocument(<CRPage fetchCR={ fetchCR } crid='123' />);

    fetchCR.calledWith('123').should.be.true();
  });

  it('should trigger fetchCR if crid changed', function () {
    const fetchCR = spy();
    instance = renderIntoDocument(<CRPage crid='123' />);

    instance = reRender(<CRPage crid='456' fetchCR={ fetchCR } />, instance);
    fetchCR.calledWith('456').should.be.true();
  });
});
