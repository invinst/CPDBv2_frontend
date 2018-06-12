import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  Simulate
} from 'react-addons-test-utils';
import { stub } from 'sinon';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError } from 'utils/test';
import LeftNavigation from 'components/officer-page/radar-chart/explainer/left-navigation';


describe('LeftNavigation components', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correct content', function () {
    instance = renderIntoDocument(<LeftNavigation text='Some text'/>);

    findDOMNode(instance).textContent.should.eql('Some text');
  });

  it('should invoke onClickHandler when being clicked', function () {
    const onClickHandlerStub = stub();

    instance = renderIntoDocument(
      <LeftNavigation onClickHandler={ onClickHandlerStub } text='Some text'/>
    );

    const leftNavigationElm = findRenderedDOMComponentWithClass(instance, 'test--radar-explainer-navigation-left');
    Simulate.click(leftNavigationElm);

    onClickHandlerStub.calledOnce.should.be.true();
  });
});
