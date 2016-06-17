import React from 'react';
import { spy } from 'sinon';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument, findRenderedComponentWithType, scryRenderedComponentsWithType, Simulate
} from 'react-addons-test-utils';

import ClosableNavLink from 'components/closable-nav-link';
import NavLink from 'components/common/nav-link';
import CloseButton from 'components/common/close-btn';
import { unmountComponentSuppressError } from 'utils/test';


describe('ClosableNavLink component', function () {
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should render NavLink component', function () {
    element = renderIntoDocument(<ClosableNavLink href='abc'/>);
    findRenderedComponentWithType(element, NavLink);
  });

  it('should show close button when showCloseBtn is true', function () {
    element = renderIntoDocument(<ClosableNavLink href='abc' showCloseBtn={ true }/>);
    findRenderedComponentWithType(element, CloseButton);
  });

  it('should not show close button when showCloseBtn is false', function () {
    element = renderIntoDocument(<ClosableNavLink href='abc' showCloseBtn={ false }/>);
    scryRenderedComponentsWithType(element, CloseButton).length.should.equal(0);
  });

  it('should trigger onClickClose when click on close button', function () {
    let callback = spy();
    element = renderIntoDocument(
      <ClosableNavLink href='abc' showCloseBtn={ true } onClickClose={ callback }/>
    );
    let button = findRenderedComponentWithType(element, CloseButton);
    Simulate.click(findDOMNode(button));
    callback.called.should.be.true();
  });
});
