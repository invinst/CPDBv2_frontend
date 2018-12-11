import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  Simulate
} from 'react-addons-test-utils';
import { stub } from 'sinon';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError } from 'utils/test';
import RightNavigation from 'components/officer-page/radar-chart/explainer/right-navigation';
import styles from 'components/officer-page/radar-chart/explainer/right-navigation.sass';


describe('RightNavigation components', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correct content', function () {
    instance = renderIntoDocument(<RightNavigation text='Some text'/>);

    findDOMNode(instance).textContent.should.eql('Some text');
  });

  it('should invoke onClickHandler when being clicked', function () {
    const onClickHandlerStub = stub();

    instance = renderIntoDocument(
      <RightNavigation onClickHandler={ onClickHandlerStub } text='Some text'/>
    );

    const rightNavigationElm = findRenderedDOMComponentWithClass(instance, styles.rightNavigation);
    Simulate.click(rightNavigationElm);

    onClickHandlerStub.calledOnce.should.be.true();
  });
});
