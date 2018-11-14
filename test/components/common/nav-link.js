import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { Link } from 'react-router';

import NavLink from 'components/common/nav-link';
import { unmountComponentSuppressError } from 'utils/test';


describe('NavLink component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render', function () {
    NavLink.should.be.renderable({ href: '/path' });
  });

  it('should have bold text when isActive is true', function () {
    instance = renderIntoDocument(
      <NavLink isActive={ true } href='/'/>
    );
    let element = findDOMNode(findRenderedComponentWithType(instance, Link));
    element.style.fontWeight.should.equal('bold');
  });

  it('should not have bold text when isActive is false', function () {
    instance = renderIntoDocument(
      <NavLink isActive={ false } href='/'/>
    );
    let element = findDOMNode(findRenderedComponentWithType(instance, Link));
    element.style.fontWeight.should.not.equal('bold');
  });
});
